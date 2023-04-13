<?php
$college = $_GET["college"];
$score = $_GET["score"];

// Connect to the database
$db = new SQLite3('leaderboard.db');

// Check if the college exists in the database
$query = $db->prepare("SELECT * FROM leaderboard WHERE name = :college");
$query->bindValue(':college', $college, SQLITE3_TEXT);
$result = $query->execute();

if ($row = $result->fetchArray()) {
  // If the college exists, update their score
  $newScore = $row["score"] + $score;
  $query = $db->prepare("UPDATE leaderboard SET score = :newScore WHERE name = :college");
  $query->bindValue(':newScore', $newScore, SQLITE3_INTEGER);
  $query->bindValue(':college', $college, SQLITE3_TEXT);
  $query->execute();
} else {
  // If the college does not exist, add them to the database
  $query = $db->prepare("INSERT INTO leaderboard (name, score) VALUES (:college, :score)");
  $query->bindValue(':college', $college, SQLITE3_TEXT);
  $query->bindValue(':score', $score, SQLITE3_INTEGER);
  $query->execute();
}
?>