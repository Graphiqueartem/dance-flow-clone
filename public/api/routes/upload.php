
<?php
$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    sendError('Method not allowed', 405);
}

if (!isset($_FILES['file'])) {
    sendError('No file uploaded', 400);
}

$file = $_FILES['file'];
$upload_dir = '../uploads/';

// Create upload directory if it doesn't exist
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// Check file size (50MB max)
$max_size = 50 * 1024 * 1024;
if ($file['size'] > $max_size) {
    sendError('File too large. Maximum size is 50MB', 400);
}

// Check file type
$allowed_types = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime_type, $allowed_types)) {
    sendError('Invalid file type', 400);
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = generateId() . '.' . $extension;
$filepath = $upload_dir . $filename;

if (move_uploaded_file($file['tmp_name'], $filepath)) {
    $url = '/uploads/' . $filename;
    sendResponse(['url' => $url], 201);
} else {
    sendError('Failed to upload file', 500);
}
?>
