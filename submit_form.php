<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ontvang formuliergegevens en beveilig deze tegen HTML-injectie
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validatie: controleer of alle velden zijn ingevuld
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Instellen e-mailadres en onderwerp
        $to = "bekhitabraam@gmail.com"; // Vervang dit met je eigen e-mailadres
        $subject = "Nieuw bericht van contactformulier";

        // Opstellen van de e-mailinhoud
        $email_content = "Naam: $name\n";
        $email_content .= "E-mail: $email\n\n";
        $email_content .= "Bericht:\n$message\n";

        // Headers instellen (vanaf-adres)
        $headers = "From: $email";

        // E-mail versturen
        if (mail($to, $subject, $email_content, $headers)) {
            // Succesbericht bij geslaagde verzending
            echo "Bedankt voor je bericht, we nemen snel contact met je op.";
        } else {
            // Foutmelding bij mislukte verzending
            echo "Er is iets misgegaan bij het versturen. Probeer het later opnieuw.";
        }
    } else {
        // Bericht als niet alle velden zijn ingevuld
        echo "Vul alle velden in.";
    }
} else {
    // Redirect naar de contactpagina als er direct toegang wordt verkregen
    header("Location: contact.html");
    exit();
}
?>
