export default class WidgetCripto {
    constructor(place = null) {
        this.place = place || document.querySelector('main')
        this.algorithms = ["MD5", "SHA1", "SHA256", "SHA512"]
        this.createDom()
    }
    createDom (){
        const hashWidget = document.createElement("div")
        hashWidget.className = "hash__widget"

        const tittle = document.createElement("h1")
        tittle.textContent  = "Hasher"
        
        const inputPlace = document.createElement("div")
        inputPlace.className = "hash__input-place"
        

        const inputFile = document.createElement("input")
        inputFile.className ="hash__input"
        inputFile.type = "file"


        const hashAlgorithm = document.createElement("div")
        hashAlgorithm.className = "hash__algorithm"



        const selectTitle = document.createElement("label")
        
        selectTitle.textContent = "Hash Algorithm"

        const hashAlgorithmSelect = document.createElement("select")
        hashAlgorithmSelect.id = "hash_algorithm-select"
        selectTitle.for = "hash_algorithm-select"

        for (const algorithmName of this.algorithms){

            const algorithm = document.createElement("option")
            algorithm.value = algorithmName
            algorithm.textContent = algorithmName
            hashAlgorithmSelect.append(algorithm) 
        }


        const calculateHashTitle = document.createElement("span")
        calculateHashTitle.textContent = "Calculated Hash:"
        calculateHashTitle.className = "hash__calculated-title"

        const calculateHash = document.createElement("span")
        calculateHash.textContent = "XXXXXXXXXXXXXXXXXXXXXXXXXX"
        calculateHash.className = "hash__calculated"

        hashAlgorithm.append(selectTitle, hashAlgorithmSelect)
        // hashAlgorithm.value = "MD5"

        inputPlace.appendChild(inputFile)
        hashWidget.append(tittle, inputPlace, hashAlgorithm)


        this.place.appendChild(hashWidget)

        hashWidget.insertAdjacentElement("afterend", calculateHash)
        hashWidget.insertAdjacentElement("afterend", calculateHashTitle)
    }   
}