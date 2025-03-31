import  {Command} from 'commander';

const program = new Command();

program.name("CLI-Contacts-App")
program.version("1.0.0")
program.description("Building Contact App using Terminal")


// program.command("add-two-numbers").action( ()=> {console.log("add two numbers")})
const addCommand = program.command("Add")
addCommand.description("Addition")
addCommand.requiredOption("-f | --first <value>", "Enter first number")
addCommand.requiredOption("-s | --second <value>", "Enter second number")
addCommand.action((options)=>{

    const firstNumber = Number(options.first);
    const secondNumber = Number(options.second);

    // console.log(options);
    console.log(`Sum: ${firstNumber} + ${secondNumber} = ${firstNumber + secondNumber}`)
})

const multiplyCommand = program.command("Multiply")
multiplyCommand.description("Multiplication")
multiplyCommand.requiredOption("-f | --first <value>", "Enter first number")
multiplyCommand.requiredOption("-s | --second <value>", "Enter second number")
multiplyCommand.action((options)=>{

    const firstNumber = Number(options.first);
    const secondNumber = Number(options.second);

    console.log(`Product: ${firstNumber} * ${secondNumber} = ${firstNumber * secondNumber}`)
})

const subtractCommand = program.command("Subtract")
subtractCommand.description("Finds the difference between  numbers")
subtractCommand.requiredOption("-f | --first <value>", "first number")
subtractCommand.requiredOption("-s | --second <value>", "second number")
subtractCommand.action((options) => {
    const firstNumber = Number(options.first);
    const secondNumber = Number(options.second)

    console.log(`Difference: ${firstNumber} - ${secondNumber} = ${firstNumber - secondNumber}`)
})




program.parse();