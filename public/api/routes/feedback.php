
<?php
$method = $_SERVER['REQUEST_METHOD'];
$path_parts = explode('/', trim($path, '/'));

// Add debugging
error_log("Feedback route accessed - Method: $method");

switch ($method) {
    case 'GET':
        if (isset($_GET['performance_id']) && !empty($_GET['performance_id'])) {
            getFeedbackByPerformance($db, $_GET['performance_id']);
        } else {
            getAllFeedback($db);
        }
        break;
    case 'POST':
        createFeedback($db);
        break;
    default:
        sendError('Method not allowed', 405);
}

function getAllFeedback($db) {
    try {
        error_log("Fetching all feedback");
        $stmt = $db->prepare("SELECT * FROM performance_feedback ORDER BY submitted_at DESC");
        $stmt->execute();
        $feedback = $stmt->fetchAll();
        error_log("Found " . count($feedback) . " feedback entries");
        sendResponse($feedback);
    } catch(Exception $e) {
        error_log("Error fetching feedback: " . $e->getMessage());
        sendError('Failed to fetch feedback: ' . $e->getMessage(), 500);
    }
}

function getFeedbackByPerformance($db, $performanceId) {
    try {
        error_log("Fetching feedback for performance: $performanceId");
        $stmt = $db->prepare("SELECT * FROM performance_feedback WHERE performance_id = ? ORDER BY submitted_at DESC");
        $stmt->execute([$performanceId]);
        $feedback = $stmt->fetchAll();
        error_log("Found " . count($feedback) . " feedback entries for performance: $performanceId");
        sendResponse($feedback);
    } catch(Exception $e) {
        error_log("Error fetching feedback by performance: " . $e->getMessage());
        sendError('Failed to fetch feedback by performance: ' . $e->getMessage(), 500);
    }
}

function createFeedback($db) {
    $input = file_get_contents('php://input');
    error_log("Received feedback data: " . $input);
    
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON decode error: " . json_last_error_msg());
        sendError('Invalid JSON data', 400);
        return;
    }
    
    $required_fields = ['judge_id', 'judge_name', 'text_feedback'];
    $missing = validateRequired($data, $required_fields);
    
    if (!empty($missing)) {
        error_log("Missing required fields: " . implode(', ', $missing));
        sendError('Missing required fields: ' . implode(', ', $missing), 400);
        return;
    }
    
    try {
        $id = generateId();
        error_log("Creating feedback with ID: $id");
        
        $stmt = $db->prepare("
            INSERT INTO performance_feedback (id, performance_id, judge_id, judge_name, technique, timing, reflex, smoothness, creativity, overall, text_feedback, video_feedback_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $result = $stmt->execute([
            $id,
            sanitizeInput($data['performance_id'] ?? null),
            sanitizeInput($data['judge_id']),
            sanitizeInput($data['judge_name']),
            intval($data['technique'] ?? 0),
            intval($data['timing'] ?? 0),
            intval($data['reflex'] ?? 0),
            intval($data['smoothness'] ?? 0),
            intval($data['creativity'] ?? 0),
            intval($data['overall'] ?? 0),
            sanitizeInput($data['text_feedback']),
            sanitizeInput($data['video_feedback_url'] ?? null)
        ]);
        
        if ($result) {
            error_log("Feedback created successfully with ID: $id");
            
            // Get the created feedback
            $stmt = $db->prepare("SELECT * FROM performance_feedback WHERE id = ?");
            $stmt->execute([$id]);
            $feedback = $stmt->fetch();
            
            sendResponse($feedback, 201);
        } else {
            error_log("Failed to execute insert statement");
            sendError('Failed to create feedback', 500);
        }
        
    } catch(Exception $e) {
        error_log("Exception creating feedback: " . $e->getMessage());
        sendError('Failed to create feedback: ' . $e->getMessage(), 500);
    }
}
?>
