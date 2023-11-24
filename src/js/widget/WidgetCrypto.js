import fileToArrayBuffer from "@npmlib/file-to-arraybuffer"
import Worker from "../web-worker"

export default class WidgetCripto {
    constructor(place = null) {
        this.place = place || document.querySelector('main')
        this.algorithms = ["MD5", "SHA1", "SHA256", "SHA512"]
        this.inputFile = null
        this.worker = new Worker()
        this.algorithm = null
        this.calculateHash = null
        this.createDom()
        this.worker.addEventListener('message', this.setHash)
    }
    createDom (){
        const hashWidget = document.createElement("div")
        hashWidget.className = "hash__widget"

        const tittle = document.createElement("h1")
        tittle.textContent  = "Hasher"
        
        const inputPlace = document.createElement("div")
        inputPlace.className = "hash__input-place"
        inputPlace.addEventListener("click", this.handleClick)
        inputPlace.addEventListener('dragover', (event) => { event.preventDefault() })
        inputPlace.addEventListener('drop', this.onDrop)
        

        const inputFile = document.createElement("input")
        inputFile.className ="hash__input"
        inputFile.type = "file"
        inputFile.addEventListener("change", this.addFile)

        this.inputFile = inputFile


        const hashAlgorithm = document.createElement("div")
        hashAlgorithm.className = "hash__algorithm"



        const selectTitle = document.createElement("label")
        
        selectTitle.textContent = "Hash Algorithm"

        const hashAlgorithmSelect = document.createElement("select")
        hashAlgorithmSelect.id = "hash_algorithm-select"
        selectTitle.for = "hash_algorithm-select"
        this.algorithm = hashAlgorithmSelect


        for (const algorithmName of this.algorithms){

            const algorithm = document.createElement("option")
            algorithm.value = algorithmName
            algorithm.textContent = algorithmName
            hashAlgorithmSelect.append(algorithm) 
        }


        const calculateHashTitle = document.createElement("span")
        calculateHashTitle.textContent = "Calculated Hash:"
        calculateHashTitle.className = "hash__calculated-title"

        const calculateHashWrapper = document.createElement("div")
        calculateHashWrapper.className = "hash__calculated-wrapper"

        const calculateHash = document.createElement("span")
        calculateHash.textContent = "XXXXXXXXXXXXXXXXXXXXXXXXXX"
        calculateHash.className = "hash__calculated"
        this.calculateHash = calculateHash
        calculateHashWrapper.appendChild(calculateHash)

        hashAlgorithm.append(selectTitle, hashAlgorithmSelect)

        inputPlace.appendChild(inputFile)
        hashWidget.append(tittle, inputPlace, hashAlgorithm)


        this.place.appendChild(hashWidget)

        hashWidget.insertAdjacentElement("afterend", calculateHashWrapper)
        hashWidget.insertAdjacentElement("afterend", calculateHashTitle)
    }   


    handleClick =() =>{
        this.inputFile.click()
    }

    onDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files && event.dataTransfer.files[0]
        if (file){
            fileToArrayBuffer(file)
            .then((arrayBuffer) => this.worker.postMessage({arrayBuffer, type : this.algorithm.value}))

        }
      }

    addFile = () => {
        console.log("change");
        const file = this.inputFile.files && this.inputFile.files[0]
        if (file){
            fileToArrayBuffer(file).then((arrayBuffer) => this.worker.postMessage({arrayBuffer, type : this.algorithm.value}))
        }
        this.inputFile.value = ""
        
        console.log(this.inputFile.files);
    }  

    setHash = (event) => {
        this.calculateHash.textContent = event.data
    }

}