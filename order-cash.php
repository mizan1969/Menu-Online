<?php

// Configuration Settings
$SendFrom =    "onlineorder.com <Sent from online order.>";
$SendTo =      "mizan@faabra.com";
$SubjectLine = "From online order cash form.";
$ThanksURL =   "thanks.html";  //confirmation page

// Build Message Body from Web Form Input
foreach ($_POST as $Field=>$Value)
   $MsgBody .= "$Field: $Value\n";
   
$MsgBody .= "\n" . @gethostbyaddr($_SERVER["REMOTE_ADDR"]) . "\n" .
   $_SERVER["HTTP_USER_AGENT"];
$MsgBody = htmlspecialchars($MsgBody, ENT_NOQUOTES);  //make safe

// Send E-Mail and Direct Browser to Confirmation Page
mail($SendTo, $SubjectLine, $MsgBody, "From: $SendFrom");
header("Location: $ThanksURL");
?>