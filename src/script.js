let lengthSlider = document.querySelector("#lengthSlider");
let sliderValue = document.querySelector("#sliderValue");
let password = document.querySelector("#pass");
let txt1 = document.querySelector("#txt1");
let txt2 = document.querySelector("#txt2");

lengthSlider.value = 8;
sliderValue.textContent = 8;

lengthSlider.addEventListener("input", () => {
    if (lengthSlider.value < 6) {
        password.setAttribute("placeholder", "Pin");
        txt1.textContent = "Pin";
        txt2.textContent = "Pin";
    } else {
        password.setAttribute("placeholder", "Password");
        txt1.textContent = "Password";
        txt2.textContent = "Password";
    }
    sliderValue.textContent = lengthSlider.value;
});

// Single event listener for all row interactions
let rows = document.querySelectorAll(".row");
Array.from(rows).forEach((row) => {
    row.addEventListener("click", (event) => {
        // Prevent default behavior
        event.preventDefault();

        console.log("Row clicked!", row); // Debug log

        const radio = row.firstElementChild; // First HTML element (span)
        const checkbox = row.children[2]; // Third HTML element (input)

        console.log("Radio:", radio); // Debug log
        console.log("Checkbox:", checkbox); // Debug log

        // Toggle the checkbox state
        checkbox.checked = !checkbox.checked;

        console.log("Checkbox checked:", checkbox.checked); // Debug log

        // Update the radio icon based on checkbox state
        if (checkbox.checked) {
            radio.textContent = "radio_button_checked";
        } else {
            radio.textContent = "radio_button_unchecked";
        }

        console.log("Radio text:", radio.textContent); // Debug log
    });
});

let btn_generate = document.querySelector("#btn");

btn_generate.addEventListener("click", () => {
    let length = lengthSlider.value;

    let uppercase = document.querySelector("#upperCase").checked;
    let lowercase = document.querySelector("#lowerCase").checked;
    let numbers = document.querySelector("#numbers").checked;
    let symbols = document.querySelector("#symbols").checked;

    let gen_pass = generate_pass(
        length,
        uppercase,
        lowercase,
        numbers,
        symbols
    );

    // Apply special formatting for '*' characters
    let formatted_pass = gen_pass.replace(
        /\*/g,
        '<span style="font-family: monospace;">*</span>'
    );

    password.value = gen_pass; // Set the actual value for copying
    password.innerHTML = formatted_pass; // Set the visual display with formatting
});

function generate_pass(length, uppercase, lowercase, numbers, symbols) {
    let charset = "";
    let ans = "";

    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (symbols) charset += "!@#$%^&*()?_";
    if (numbers) charset += "0123456789";

    for (let i = 0; i < length; i++) {
        let random_ch = Math.floor(Math.random() * charset.length);
        ans += charset.charAt(random_ch);
    }
    return ans;
}

let copy_icon = document.querySelector("#copy_icon");

copy_icon.addEventListener("click", () => {
    if (password.value != "") {
        navigator.clipboard.writeText(password.value);
        copy_icon.textContent = "done_all";
        setTimeout(() => {
            copy_icon.textContent = "content_copy";
        }, 1500);
    }
});
