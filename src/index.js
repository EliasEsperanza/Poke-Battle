import app from "./app.js";

const PORT = process.env.PORT || 3000;

async function main(){
    try{
        app.listen(PORT)
        console.log(`Server running on port ${PORT}`);
    }catch(e){
        console.error(e);
    }
}

main();