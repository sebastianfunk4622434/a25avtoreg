<?php

$use_base = true;
if (file_exists('transit/index.php')) {
    include("transit/index.php");
} else {
    include("landing/index.php");
}