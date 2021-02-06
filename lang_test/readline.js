const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`)
  console.log({"name":"Nils","last":"Haug"});

  console.log("My Name is %s and i'm %d years old",name,29);
  readline.close()
})
