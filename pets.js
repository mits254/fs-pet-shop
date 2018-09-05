const fs = require('fs');


fs.readFile('./pets.json','utf8',(err,data)=>{
    let myPet = JSON.parse(data);
    const cmd = process.argv[2];
    const age = Math.floor(Number(process.argv[3])); 
    const kind = process.argv[4];
    const name = process.argv[5];
    const index = process.argv[3]; 
    
    if(!cmd) {
       console.error('Usage: node pets.js [read | create | update | destroy]');
        process.exit(1);
      };
      
    
    if(cmd === 'read'){
        
          if(index > myPet.length || index < 0){
          console.error('Usage: node pets.js read INDEX');
          process.exit(1);
          } else if(index){
            console.log(myPet[index]);
          } else {
              console.log(myPet);
          }
        }      
    if(cmd === 'create') {
        
        if(age && kind && name){
        //create a new database
        const newdata = new Object();
            newdata.age = age;
            newdata.kind = `${kind}`;
            newdata.name = `${name}`;
            let myPets = JSON.parse(data);
            myPets.push(newdata);
        fs.writeFile('pets.json',JSON.stringify(myPets),(err)=>{
            if(err){
                console.error('Usage: node pets.js create AGE KIND NAME');
                process.exit(1);
            }
            console.log(myPets[2]);
        })
         } else {
        console.error('Usage: node pets.js create AGE KIND NAME');
        process.exit(1);
         } 
    }

    
       
}); 
