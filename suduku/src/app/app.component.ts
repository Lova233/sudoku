import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor( @Inject(DOCUMENT) document: Document) {
    //100586000020479801087312045042090100761235000090104327803700900210953704000000000
  }

  currentSelectedRow: any;
  currentSelectedColumn: any;

  grid = [
    [1, 0, 0, 5, 8, 6, 0, 0, 0],
    [0, 2, 0, 4, 7, 9, 8, 0, 1],
    [0, 8, 7, 3, 1, 2, 0, 4, 5],
    [0, 4, 2, 0, 9, 0, 1, 0, 0],
    [7, 6, 1, 2, 3, 5, 0, 0, 0],
    [0, 9, 0, 1, 0, 4, 3, 2, 7],
    [8, 0, 3, 7, 0, 0, 9, 0, 0],
    [2, 1, 0, 9, 5, 3, 7, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  solvedGrid = [
    [1, 0, 0, 5, 8, 6, 0, 0, 0],
    [0, 2, 0, 4, 7, 9, 8, 0, 1],
    [0, 8, 7, 3, 1, 2, 0, 4, 5],
    [0, 4, 2, 0, 9, 0, 1, 0, 0],
    [7, 6, 1, 2, 3, 5, 0, 0, 0],
    [0, 9, 0, 1, 0, 4, 3, 2, 7],
    [8, 0, 3, 7, 0, 0, 9, 0, 0],
    [2, 1, 0, 9, 5, 3, 7, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  addNumberToGrid(event: any, rowIndex:number, blockIndex: number) {
    let inputValue: number = parseInt(event.target.value)
    let correctAnswer = this.verifyAnswers(inputValue, rowIndex, blockIndex);
    if(correctAnswer) {

      console.log("ANSWER IS ACCEPTABLE")
      this.solvedGrid[rowIndex][blockIndex] = inputValue;
      //this.grid[rowIndex][blockIndex] = inputValue;
    }

  }




  checkRowCorrectness(inputNumber: number, rowNumber: number, blockNumber: number): boolean {
    if(this.solvedGrid[rowNumber].includes(inputNumber)) {
      console.log("include the number in the row so the number is wrong")
      this.highlightWrongNumber(rowNumber, blockNumber);
      return false
    } else {
      console.log("does not include the number in the row so the number is right")
      return true
    }
  }

  checkColumnCorrectness(inputNumber: number, rowNumber: number, columNumber: number) {
      //check column
      let columnToCheck = [];
      const arrayColumn = (arr:any, n:any) => arr.map((x: { [x: string]: any; }) => x[n]);
      columnToCheck.push(arrayColumn(this.solvedGrid, columNumber))

      if(columnToCheck[0].includes(inputNumber)) {
        console.log("include the number in the column so the number is wrong")
        this.highlightWrongNumber(rowNumber, columNumber);
        return false
      } else {
        console.log("does not include the number in the column so the number is right")
        return true
      }
  }


  checkBlockCorrectness(inputNumber: number, rowNumber: number, columNumber: number): boolean{
    let blockToCheck = [ ]
    let arrayTosplice = this.getSpliceValues(rowNumber);
    let spliceFrom = this.getSpliceValues(columNumber);
    let copyOfgrid = JSON.parse(JSON.stringify(this.solvedGrid))

    for (let row = 0; row < 3; row++) { 
      blockToCheck.push(copyOfgrid[arrayTosplice].splice(spliceFrom, 3))
      arrayTosplice++
      console.log("inside for")
    }
    

    console.log(this.solvedGrid, "after for")
    let arrayToCheck = blockToCheck[0].concat(blockToCheck[1]).concat(blockToCheck[2])
    console.log(arrayToCheck,"the block")
    if(arrayToCheck.includes(inputNumber)){
      console.log("include the number in the block so the number is wrong")
      console.log(this.solvedGrid,"the block wrong")
      this.highlightWrongNumber(rowNumber, columNumber);

      return false
    } else {
      console.log("does not the number in the block so the number is wrong")
      return true
    }
  }

  getSpliceValues(index: number): number {
    switch (true) {
      case (index <= 2):
          return 0;
      case (index > 2 && index <= 5):
          return 3
      case (index > 5):
          return 6;
      default:
          return 0
  }
  }

  verifyAnswers(inputNumber: number, rowNumber: number, columNumber: number): boolean {
    console.log(this.solvedGrid, "in verify")
    let correctRow = this.checkRowCorrectness(inputNumber, rowNumber, columNumber) 
    let correctColumn = this.checkColumnCorrectness(inputNumber, rowNumber, columNumber)
    let correctBlock = this.checkBlockCorrectness(inputNumber, rowNumber, columNumber)

    if(correctRow && correctColumn && correctBlock) {
      return true
    }else {
      return false
    }
}

highlightWrongNumber(rowNumber: number, blockNumber: number) {
 //console.log("the wrong number is at row index" + rowNumber + "and column index" + blockNumber)
 let id: string = rowNumber.toString()+blockNumber.toString()
 let el = document.getElementById(id) as HTMLInputElement
 el.value = ""
}

highlightArea(rowIndex:number, blockIndex: number){
  if(this.currentSelectedColumn){
    console.log(this.currentSelectedColumn)
    for (let area = 0; area < 9; area++) { 
      let id:string = area+blockIndex.toString()
      this.currentSelectedColumn = document.getElementById(id) as HTMLElement
      this.currentSelectedColumn.style.backgroundColor =  "white";
      console.log("here")
      rowIndex ++
    }

    this.currentSelectedColumn = null;
  }
  console.log(rowIndex, blockIndex)
  for (let area = 0; area < 9; area++) { 
    let id:string = area+blockIndex.toString()
    this.currentSelectedColumn = document.getElementById(id) as HTMLElement
    this.currentSelectedColumn.style.backgroundColor =  "lightBlue";
    rowIndex ++
}

  // for (let area = 0; area < 9; area++) { 
  //   let id:string = blockIndex.toString()+rowIndex.toString()
  //   let el = document.getElementById(id) as HTMLElement
  //   el.style.backgroundColor =  "lightBlue";
  //   blockIndex ++
  // }
}
removeHilightToArea(){
  console.log(this.currentSelectedColumn);
}

} 


