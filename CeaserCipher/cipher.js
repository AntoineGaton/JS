/*
INTRO: Below I code a JS algorithm that encodes and decodes phrases using a special Ceaser Cipher case called ROT13. ROT13, or rotate by 13 places, is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet.

TASK: Write a function that takes a ROT13 encoded uppercase string and returns a decoded string. If string contains non-alphabetic characters or spaces, do not change them but do pass them along.

THOUGHT PROCESS:
- In the simplest form I understood that I would be shifitng one alphabet 13 spaces.
- So to make it easier on myself I used .charCodeAt() and .fromCharCode to convert the letter I am passing through to its corresponding ASCII value.
- Seeing that I am dealing with only uppercase letters I know my ASCII value will be between 65 and 90.
- Furthermore, if a phrase was being inputed it would be a good idea to loop that phrase one by one and as I convert it I add it to an empty string.
- In the end it was important for me to use .toUpperCase() before passing into the function so the decoding occurs propperly and to have a statement that catches any special characters to be addded accordingly.
*/

function rot13(str){//Function that encodes or decodes string
    let decoded = "";//Empty string in which I will be .push() the results into

    for (let i = 0; i < str.length; i++){//Loop through string content
        let asciiNum = str[i].charCodeAt();//Convert string to numeric ASCII value

        if (asciiNum >= 65 && asciiNum <= 77){//Shifts letter 13 spaces to the right if letter is between A and M
            decoded += String.fromCharCode(asciiNum + 13);
        } else if (asciiNum >= 78 && asciiNum <= 90){//Shift letter 13 spaces to the left if letter is between N and Z
            decoded += String.fromCharCode(asciiNum - 13);
        } else {//If any spaces or special characters come through it will be added
            decoded += str[i];
        }
    }

    return decoded;
}

let code = "GUNAX lbh SBE gur BCCBEGHAVGL naar!";
console.log(rot13(code.toUpperCase()))