// use strict mode
`use strict`;

// const variables 
const gap = ` `; // one space
const newl = `\n`; // new line 
const numeric = /\d+/; // this is a regrular expression for one or more numeric digits, it is later used to check if there is a numeric digit in a record


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// extra functions
const incNum = function(value){ // this will take in a string and increase any numeric value in it *** if it is greater than 1 ***
  let str = ``; // this string will be appended and then returned
  const hasNum = value.match(numeric);
  // console.log(`Input:  ${value}`);
  if(hasNum){ // if a number is present, the number will be incremented and the string will be altered 
    // split the string into text and number sections
    let newWords = value.split(numeric)[0]; // string of all text before number in value string
    let newNum = Number(hasNum); // number taken out of value string
    newNum++; // now increment the number before returning it
    str = newWords + newNum; // append values into str
  }
  // console.log(`Output: ${str}`); // log str
  return str; // return updated str
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('file').onchange = function(){


    let file = this.files[0]; // the files property returns a file list. 
    // so file [0] returns the file at index 0
  
    let reader = new FileReader();
    reader.onload = function(){ // i don't fully understand what this line does,
      // but i do know it causes the function to run when reader is loaded
      // console.log(this.result); // prints entire object
      let workArray = []; // new array that contains all file data
      let lines = this.result.split(`\n`);
      for(let line = 0; line < lines.length; line++){ // fills workArray with lines of strings
        let currentLine = lines[line].trimStart();
        workArray.push(currentLine.split(`=`));
        //console.log();
      }
      
      const createNewString = function (arr){ // loops through and increments each appropriate line
        let str = ``; // create return string
        let userLineNumber = prompt(`What line would you like to insert a row at? `, 2);

        for(let line = 0; line < workArray.length; line++){
          let miniStr = ``;
          let fullLine = lines[line].toString(); 
          let firstHalf = workArray[line][0]; // line before `=`
          let secondHalf = workArray[line][1]; // line after `=`
          let numVal = Number(firstHalf.match(numeric)); // number value in first half

          // console.log(`Ministr: ${miniStr},\nFullLine: ${fullLine},\nFirstHalf: ${firstHalf},\nSecondHalf: ${secondHalf}\n`);
          if(fullLine.includes(`=`)){
            // if numVal === 2, create new line with input from prompt
            if(numVal === userLineNumber){
              str += window.prompt(`Complete the new line: `, `${fullLine}`) + newl; // when on the second base, server, location, etc. insert new line based on user input
            }
            miniStr += ` ${numVal > 1 ? incNum(firstHalf) + gap : firstHalf}=${secondHalf}`; // create string to append to str after each iteration
            // console.log(miniStr); 
          } else {
            miniStr = `${fullLine}`; // if no `=` sign, add full line unedited
          }
          // appends line to string with line break after each
          str += miniStr + newl;
        }
        //console.log(str);
        return str; // return altered string
      }
      // console.log(createNewString(workArray));
      alert(createNewString(workArray));
      // alert(str);
    }


    reader.readAsText(file);
  };




// what's left
// - host on webpage
// - try and predict the new entry
// - create way to insert rows where ever the user wants




  




  
  // in the future I would like to consider using objects to do this
  // each section of the file would be an object (DBMS, Database, Budget, Server, District, Locations)

 // create an object prototype and then use Object.create() to make a copy of it for each section?