
<?php
$method = $_SERVER['REQUEST_METHOD'];
$path_parts = explode('/', trim($path, '/'));

// Add debugging
error_log("Performance route accessed - Method: $method");
error_log("Path parts: " . json_encode($path_parts));

switch ($method) {
    case 'GET':
        if (isset($_GET['email']) && !empty($_GET['email'])) {
            getPerformancesByEmail($db, $_GET['email']);
        } else if (isset($path_parts[1]) && !empty($path_parts[1])) {
            getPerformance($db, $path_parts[1]);
        } else {
            getPerformances($db);
        }
        break;
    case 'POST':
        createPerformance($db);
        break;
    case 'PUT':
        if (isset($path_parts[1])) {
            updatePerformance($db, $path_parts[1]);
        }
        break;
    default:
        sendError('Method not allowed', 405);
}

function getPerformances($db) {
    try {
        error_log("Fetching all performances");
        $stmt = $db->prepare("SELECT * FROM performances ORDER BY submitted_at DESC");
        $stmt->execute();
        $performances = $stmt->fetchAll();
        error_log("Found " . count($performances) . " performances");
        sendResponse($performances);
    } catch(Exception $e) {
        error_log("Error fetching performances: " . $e->getMessage());
        sendError('Failed to fetch performances: ' . $e->getMessage(), 500);
    }
}

function getPerformancesByEmail($db, $email) {
    try {
        error_log("Fetching performances for email: $email");
        $stmt = $db->prepare("SELECT * FROM performances WHERE email = ? ORDER BY submitted_at DESC");
        $stmt->execute([$email]);
        $performances = $stmt->fetchAll();
        error_log("Found " . count($performances) . " performances for email: $email");
        sendResponse($performances);
    } catch(Exception $e) {
        error_log("Error fetching performances by email: " . $e->getMessage());
        sendError('Failed to fetch performances by email: ' . $e->getMessage(), 500);
    }
}

function getPerformance($db, $id) {
    try {
        error_log("Fetching performance with ID: $id");
        $stmt = $db->prepare("SELECT * FROM performances WHERE id = ?");
        $stmt->execute([$id]);
        $performance = $stmt->fetch();
        
        if ($performance) {
            error_log("Performance found: " . json_encode($performance));
            sendResponse($performance);
        } else {
            error_log("Performance not found with ID: $id");
            sendError('Performance not found', 404);
        }
    } catch(Exception $e) {
        error_log("Error fetching performance: " . $e->getMessage());
        sendError('Failed to fetch performance: ' . $e->getMessage(), 500);
    }
}

function createPerformance($db) {
    $input = file_get_contents('php://input');
    error_log("Received performance data: " . $input);
    
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON decode error: " . json_last_error_msg());
        sendError('Invalid JSON data', 400);
        return;
    }
    
    $required_fields = ['performer_name', 'performance_title', 'video_url', 'email', 'country', 'language', 'dance_genre'];
    $missing = validateRequired($data, $required_fields);
    
    if (!empty($missing)) {
        error_log("Missing required fields: " . implode(', ', $missing));
        sendError('Missing required fields: ' . implode(', ', $missing), 400);
        return;
    }
    
    try {
        $id = generateId();
        error_log("Creating performance with ID: $id");
        
        $stmt = $db->prepare("
            INSERT INTO performances (id, performer_name, performance_title, performance_description, video_url, email, feedback_type, status, country, language, dance_genre, platinum_upgrade, global_scoring, global_entry, teacher_recommendations_shown) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $result = $stmt->execute([
            $id,
            sanitizeInput($data['performer_name']),
            sanitizeInput($data['performance_title']),
            sanitizeInput($data['performance_description'] ?? null),
            sanitizeInput($data['video_url']),
            sanitizeInput($data['email']),
            $data['feedback_type'] ?? 'FREE',
            'PENDING',
            sanitizeInput($data['country']),
            sanitizeInput($data['language']),
            sanitizeInput($data['dance_genre']),
            $data['platinum_upgrade'] ?? false,
            $data['global_scoring'] ?? false,
            $data['global_entry'] ?? false,
            $data['teacher_recommendations_shown'] ?? false
        ]);
        
        if ($result) {
            error_log("Performance created successfully with ID: $id");
            getPerformance($db, $id);
        } else {
            error_log("Failed to execute insert statement");
            sendError('Failed to create performance', 500);
        }
        
    } catch(Exception $e) {
        error_log("Exception creating performance: " . $e->getMessage());
        sendError('Failed to create performance: ' . $e->getMessage(), 500);
    }
}

function updatePerformance($db, $id) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $fields = [];
        $values = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'id') {
                $fields[] = "$key = ?";
                $values[] = sanitizeInput($value);
            }
        }
        
        if (empty($fields)) {
            sendError('No fields to update', 400);
            return;
        }
        
        $values[] = $id;
        $sql = "UPDATE performances SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($values);
        
        if ($stmt->rowCount() > 0) {
            getPerformance($db, $id);
        } else {
            sendError('Performance not found', 404);
        }
    } catch(Exception $e) {
        error_log("Error updating performance: " . $e->getMessage());
        sendError('Failed to update performance: ' . $e->getMessage(), 500);
    }
}
?>
