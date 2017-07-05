<?php
    define('PHOTOURL', 'server/files/image/');
    define('ARENAURL', 'server/files/image/');

    $org_name = basename($_FILES['imagelinkvalue']['name']);
    $real_name = convertToUniqueFilename($org_name);
    $target_path = PHOTOURL.$real_name;
    if(move_uploaded_file($_FILES['imagelinkvalue']['tmp_name'], $target_path))
        echo ARENAURL.$real_name;
    else
        echo "error";

    function convertToUniqueFilename($original_Name)
    {
        list($pre_name, $extension) = explode('.', $original_Name);
        $uniqu_ID = time(true);
        $tmp_filename = $pre_name.$uniqu_ID.".".$extension;

        return $tmp_filename;
    }
?>