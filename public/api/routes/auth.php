
<?php
$method = $_SERVER['REQUEST_METHOD'];

// Add debugging
error_log("Auth route accessed - Method: $method");

switch ($method) {
    case 'POST':
        handleAuth($db);
        break;
    default:
        sendError('Method not allowed', 405);
}

function handleAuth($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['action'])) {
        sendError('Invalid request data', 400);
        return;
    }
    
    $action = $data['action'];
    
    switch ($action) {
        case 'login':
            loginJudge($db, $data);
            break;
        case 'register':
            registerJudge($db, $data);
            break;
        default:
            sendError('Invalid action', 400);
    }
}

function loginJudge($db, $data) {
    if (!isset($data['email']) || !isset($data['password'])) {
        sendError('Email and password are required', 400);
        return;
    }
    
    try {
        $stmt = $db->prepare("SELECT * FROM judges WHERE email = ? OR username = ?");
        $stmt->execute([$data['email'], $data['email']]);
        $judge = $stmt->fetch();
        
        if ($judge && password_verify($data['password'], $judge['password'])) {
            // Remove password from response
            unset($judge['password']);
            sendResponse($judge);
        } else {
            sendError('Invalid credentials', 401);
        }
    } catch(Exception $e) {
        error_log("Login error: " . $e->getMessage());
        sendError('Login failed: ' . $e->getMessage(), 500);
    }
}

function registerJudge($db, $data) {
    $required_fields = ['name', 'email', 'password'];
    $missing = validateRequired($data, $required_fields);
    
    if (!empty($missing)) {
        sendError('Missing required fields: ' . implode(', ', $missing), 400);
        return;
    }
    
    try {
        // Check if email already exists
        $stmt = $db->prepare("SELECT id FROM judges WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            sendError('Email already registered', 409);
            return;
        }
        
        $id = generateId();
        $hashedPassword = hashPassword($data['password']);
        
        $stmt = $db->prepare("
            INSERT INTO judges (id, name, email, password, username, country, languages, dance_genres, is_platinum, bio, hourly_rate, available_for_hire, rating, review_count, profile_image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $id,
            sanitizeInput($data['name']),
            sanitizeInput($data['email']),
            $hashedPassword,
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
        
        // Return judge data without password
        $judge = [
            'id' => $id,
            'name' => $data['name'],
            'email' => $data['email'],
            'username' => $data['username'] ?? null,
            'country' => $data['country'] ?? null,
            'languages' => $data['languages'] ?? [],
            'dance_genres' => $data['dance_genres'] ?? [],
            'is_platinum' => $data['is_platinum'] ?? false,
            'bio' => $data['bio'] ?? null,
            'hourly_rate' => $data['hourly_rate'] ?? null,
            'available_for_hire' => $data['available_for_hire'] ?? false,
            'rating' => $data['rating'] ?? 5.0,
            'review_count' => $data['review_count'] ?? 0,
            'profile_image' => $data['profile_image'] ?? null,
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendResponse($judge, 201);
    } catch(Exception $e) {
        error_log("Registration error: " . $e->getMessage());
        sendError('Registration failed: ' . $e->getMessage(), 500);
    }
}
?>
