
<?php
$method = $_SERVER['REQUEST_METHOD'];
$path_parts = explode('/', trim($path, '/'));

switch ($method) {
    case 'GET':
        if (isset($path_parts[1]) && !empty($path_parts[1])) {
            // Get single judge
            getJudge($db, $path_parts[1]);
        } else {
            // Get all judges
            getJudges($db);
        }
        break;
    case 'POST':
        createJudge($db);
        break;
    case 'PUT':
        if (isset($path_parts[1])) {
            updateJudge($db, $path_parts[1]);
        }
        break;
    default:
        sendError('Method not allowed', 405);
}

function getJudges($db) {
    try {
        $stmt = $db->prepare("SELECT * FROM judges ORDER BY created_at DESC");
        $stmt->execute();
        $judges = $stmt->fetchAll();
        sendResponse($judges);
    } catch(Exception $e) {
        sendError('Failed to fetch judges: ' . $e->getMessage(), 500);
    }
}

function getJudge($db, $id) {
    try {
        $stmt = $db->prepare("SELECT * FROM judges WHERE id = ?");
        $stmt->execute([$id]);
        $judge = $stmt->fetch();
        
        if ($judge) {
            sendResponse($judge);
        } else {
            sendError('Judge not found', 404);
        }
    } catch(Exception $e) {
        sendError('Failed to fetch judge: ' . $e->getMessage(), 500);
    }
}

function createJudge($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $required_fields = ['name', 'email'];
    $missing = validateRequired($data, $required_fields);
    
    if (!empty($missing)) {
        sendError('Missing required fields: ' . implode(', ', $missing), 400);
    }
    
    try {
        $id = generateId();
        $stmt = $db->prepare("
            INSERT INTO judges (id, name, email, username, country, languages, dance_genres, is_platinum, bio, hourly_rate, available_for_hire, rating, review_count, profile_image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $id,
            sanitizeInput($data['name']),
            sanitizeInput($data['email']),
            sanitizeInput($data['username'] ?? null),
            sanitizeInput($data['country'] ?? null),
            json_encode($data['languages'] ?? []),
            json_encode($data['dance_genres'] ?? []),
            $data['is_platinum'] ?? false,
            sanitizeInput($data['bio'] ?? null),
            $data['hourly_rate'] ?? null,
            $data['available_for_hire'] ?? false,
            $data['rating'] ?? 5.0,
            $data['review_count'] ?? 0,
            sanitizeInput($data['profile_image'] ?? null)
        ]);
        
        $judge = [
            'id' => $id,
            'name' => $data['name'],
            'email' => $data['email'],
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendResponse($judge, 201);
    } catch(Exception $e) {
        sendError('Failed to create judge: ' . $e->getMessage(), 500);
    }
}

function updateJudge($db, $id) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $fields = [];
        $values = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'id') {
                $fields[] = "$key = ?";
                if (in_array($key, ['languages', 'dance_genres'])) {
                    $values[] = json_encode($value);
                } else {
                    $values[] = sanitizeInput($value);
                }
            }
        }
        
        if (empty($fields)) {
            sendError('No fields to update', 400);
        }
        
        $values[] = $id;
        $sql = "UPDATE judges SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($values);
        
        if ($stmt->rowCount() > 0) {
            getJudge($db, $id);
        } else {
            sendError('Judge not found', 404);
        }
    } catch(Exception $e) {
        sendError('Failed to update judge: ' . $e->getMessage(), 500);
    }
}
?>
