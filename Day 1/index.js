const fs = require('fs');
const { json } = require('stream/consumers');
const [,,command] = process.argv;
console.log(command);
if(command ==='add'){
    const [,,,title] = process.argv;
    const data = JSON.parse(fs.readFileSync('./todo.json'),{encoding:'utf-8'});
    let id = 1;
    if(data.length !== 0){
        id =2;
        id += (data.length -1);
    }else {
        id =1;
    }
    // const lastIndex = data.find((v) => v.id > data.length);
    // console.log(typeof data)
    // id += lastIndex;
    const todo = {title,id};
    data.push(todo);
    fs.writeFileSync('./todo.json',JSON.stringify(data))
}else if (command === 'list'){
    const data = JSON.parse(fs.readFileSync('./todo.json'),{encoding:'utf-8'});
    console.log(data)
}else if (command === 'delete'){
    const data = JSON.parse(fs.readFileSync('./todo.json'),{encoding:'utf-8'});
    const[,,,id] = process.argv;
    const deleteById = data.filter((el)=> +el.id !== +id);
    fs.writeFileSync('./todo.json',JSON.stringify(deleteById))
}else if (command === 'edit'){
    const data = JSON.parse(fs.readFileSync('./todo.json'),{encoding:'utf-8'});
    const [,,,id] = process.argv;
    const [,,,,title] = process.argv;
    const idEdit = data.find((el)=>{
        return +el.id == +id;
    })
    if(+idEdit.id === +id){
        idEdit.title = title;
    }
    fs.writeFileSync('./todo.json',JSON.stringify(data))
}
