const randomNums = (cant) => {
    let toLoop = cant || 100000000;
    const answer = {};
    for (let i = 0; i < toLoop; i++) {
        const num = Math.floor(Math.random() * 999) + 1;
        if(answer[num]){
            answer[num]++;
        }else{
            answer[num] = 1;
        }
    }
    return answer
}

process.on('exit', () => {
    console.log(`random cerrado`)
})

process.on('message', msg => {
    const { cant } = msg;
    console.log(`iniciando random`)
    const randoms = randomNums(parseInt(cant));
    process.send(randoms)
    console.log(`random trabajando`)
    process.exit()
})
