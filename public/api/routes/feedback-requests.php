
<?php
$method = $_SERVER['REQUEST_METHOD'];
$path_parts = explode('/', trim($path, '/'));

// Add debugging
error_log("Feedback requests route accessed - Method: $method");

switch ($method) {
    case 'GET':
        if (isset($_GET['judge_id']) && !empty($_GET['judge_id'])) {
            getFeedbackRequestsByJudge($db, $_GET['judge_id']);
        } else {
            getAllFeedbackRequests($db);
        }
        break;
    case 'POST':
        createFeedbackRequest($db);
        break;
    case 'PUT':
        if (isset($path_parts[1])) {
            updateFeedbackRequest($db, $path_parts[1]);
        }
        break;
    default:
        sendError('Method not allowed', 405);
}

function getAllFeedbackRequests($db) {
    try {
        error_log("Fetching all feedback requests");
        $stmt = $db->prepare("SELECT * FROM feedback_requests ORDER BY requested_at DESC");
        $stmt->execute();
        $requests = $stmt->fetchAll();
        error_log("Found " . count($requests) . " feedback requests");
        sendResponse($requests);
    } catch(Exception $e) {
        error_log("Error fetching feedback requests: " . $e->getMessage());
        sendError('Failed to fetch feedback requests: ' . $e->getMessage(), 500);
    }
}

function getFeedbackRequestsByJudge($db, $judgeId) {
    try {
        error_log("Fetching feedback requests for judge: $judgeId");
        $stmt = $db->prepare("SELECT * FROM feedback_requests WHERE judge_id = ? ORDER BY requested_at DESC");
        $stmt->execute([$judgeId]);
        $requests = $stmt->fetchAll();
        error_log("Found " . count($requests) . " feedback requests for judge: $judgeId");
        sendResponse($requests);
    } catch(Exception $e) {
        error_log("Error fetching feedback requests by judge: " . $e->getMessage());
        sendError('Failed to fetch feedback requests by judge: ' . $e->getMessage(), 500);
    }
}

function createFeedbackRequest($db) {
    $input = file_get_contents('php://input');
    error_log("Received feedback request data: " . $input);
    
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON decode error: " . json_last_error_msg());
        sendError('Invalid JSON data', 400);
        return;
    }
    
    $required_fields = ['judge_id', 'judge_name', 'performer_name', 'performer_email', 'performance_title', 'video_url'];
    $missing = validateRequired($data, $required_fields);
    
    if (!empty($missing)) {
        error_log("Missing required fields: " . implode(', ', $missing));
        sendError('Missing required fields: ' . implode(', ', $missing), 400);
        return;
    }
    
    try {
        $id = generateId();
        error_log("Creating feedback request with ID: $id");
        
        $stmt = $db->prepare("
            INSERT INTO feedback_requests (id, judge_id, judge_name, performer_name, performer_email, performance_title, performance_description, video_url, message, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $result = $stmt->execute([
            $id,
            sanitizeInput($data['judge_id']),
            sanitizeInput($data['judge_name']),
            sanitizeInput($data['performer_name']),
            sanitizeInput($data['performer_email']),
            sanitizeInput($data['performance_title']),
            sanitizeInput($data['performance_description'] ?? null),
            sanitizeInput($data['video_url']),
            sanitizeInput($data['message'] ?? null),
            'pending'
        ]);
        
        if ($result) {
            error_log("Feedback request created successfully with ID: $id");
            
            // Get the created request
            $stmt = $db->prepare("SELECT * FROM feedback_requests WHERE id = ?");
            $stmt->execute([$id]);
            $request = $stmt->fetch();
            
            sendResponse($request, 201);
        } else {
            error_log("Failed to execute insert statement");
            sendError('Failed to create feedback request', 500);
        }
        
    } catch(Exception $e) {
        error_log("Exception creating feedback request: " . $e->getMessage());
        sendError('Failed to create feedback request: ' . $e->getMessage(), 500);
    }
}

function updateFeedbackRequest($db, $id) {
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
        $sql = "UPDATE feedback_requests SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($values);
        
        if ($stmt->rowCount() > 0) {
            // Get the updated request
            $stmt = $db->prepare("SELECT * FROM feedback_requests WHERE id = ?");
            $stmt->execute([$id]);
            $request = $stmt->fetch();
            sendResponse($request);
        } else {
            sendError('Feedback request not found', 404);
        }
    } catch(Exception $e) {
        error_log("Error updating feedback request: " . $e->getMessage());
        sendError('Failed to update feedback request: ' . $e->getMessage(), 500);
    }
}
?>
