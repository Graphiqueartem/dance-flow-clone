
<?php
// Basic error reporting and debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and JSON response
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');  
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Debug information
$debug_info = [
    'php_version' => phpversion(),
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'request_uri' => $_SERVER['REQUEST_URI'],
    'script_name' => $_SERVER['SCRIPT_NAME'],
    'current_directory' => __DIR__,
    'files_exist' => [
        'database.php' => file_exists(__DIR__ . '/config/database.php'),
        'functions.php' => file_exists(__DIR__ . '/utils/functions.php'),
        'judges.php' => file_exists(__DIR__ . '/routes/judges.php')
    ]
];

try {
    // Test basic functionality first
    $request_uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($request_uri, PHP_URL_PATH);
    
    // Remove /api prefix if present
    $path = preg_replace('#^/api#', '', $path);
    
    // If no specific path, show debug info
    if ($path === '/' || $path === '' || $path === '/index.php') {
        echo json_encode([
            'status' => 'API is working',
            'debug' => $debug_info,
            'message' => 'Visit /api/judges to test the judges endpoint'
        ], JSON_PRETTY_PRINT);
        exit();
    }
    
    // Include required files
    if (file_exists(__DIR__ . '/config/database.php')) {
        require_once __DIR__ . '/config/database.php';
    } else {
        throw new Exception('Database config file not found');
    }
    
    if (file_exists(__DIR__ . '/utils/functions.php')) {
        require_once __DIR__ . '/utils/functions.php';
    } else {
        throw new Exception('Functions file not found');
    }
    
    // Test database connection
    try {
        $database = new Database();
        $db = $database->getConnection();
        $debug_info['database_connection'] = 'Success';
    } catch (Exception $e) {
        $debug_info['database_connection'] = 'Failed: ' . $e->getMessage();
    }
    
    // Route the request
    if (preg_match('#^/judges(/.*)?$#', $path)) {
        if (file_exists(__DIR__ . '/routes/judges.php')) {
            require_once __DIR__ . '/routes/judges.php';
        } else {
            throw new Exception('Judges route file not found');
        }
    } elseif (preg_match('#^/auth(/.*)?$#', $path)) {
        if (file_exists(__DIR__ . '/routes/auth.php')) {
            require_once __DIR__ . '/routes/auth.php';
        } else {
            throw new Exception('Auth route file not found');
        }
    } elseif (preg_match('#^/performances(/.*)?$#', $path)) {
        if (file_exists(__DIR__ . '/routes/performances.php')) {
            require_once __DIR__ . '/routes/performances.php';
        } else {
            throw new Exception('Performances route file not found');
        }
    } else {
        http_response_code(404);
        echo json_encode([
            'error' => 'Endpoint not found', 
            'path' => $path,
            'debug' => $debug_info
        ], JSON_PRETTY_PRINT);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error', 
        'message' => $e->getMessage(),
        'debug' => $debug_info
    ], JSON_PRETTY_PRINT);
}
?>
