
<?php
// Utility functions for the API

function sendResponse($data, $status_code = 200) {
    ob_clean(); // Clean any previous output
    http_response_code($status_code);
    echo json_encode($data);
    exit;
}

function sendError($message, $status_code = 400) {
    ob_clean(); // Clean any previous output
    http_response_code($status_code);
    echo json_encode(['error' => $message]);
    exit;
}

function validateRequired($data, $required_fields) {
    $missing = [];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $missing[] = $field;
        }
    }
    return $missing;
}

function sanitizeInput($input) {
    if ($input === null) {
        return null;
    }
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function generateId() {
    return uniqid('', true) . '_' . bin2hex(random_bytes(8));
}

function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}
?>
