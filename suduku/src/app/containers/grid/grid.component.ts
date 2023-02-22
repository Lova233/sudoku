import { BlockComponent } from './../../components/block/block.component';
import { IBlock } from './../../utils/interface/iblock';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @ViewChildren(BlockComponent) blockComponent!: QueryList<BlockComponent>;

  constructor() {}

  currentSelectedRow: number | null = null;
  currentSelectedColumn: number | null = null;

  grid = [
    [1, 0, 0, 5, 8, 6, 0, 0, 0],
    [0, 2, 0, 4, 7, 9, 8, 0, 1],
    [0, 8, 7, 3, 1, 2, 0, 4, 5],
    [0, 4, 2, 0, 9, 0, 1, 0, 0],
    [7, 6, 1, 2, 3, 5, 0, 0, 0],
    [0, 9, 0, 1, 0, 4, 3, 2, 7],
    [8, 0, 3, 7, 0, 0, 9, 0, 0],
    [2, 1, 0, 9, 5, 3, 7, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  solvedGrid = [
    [1, 0, 0, 5, 8, 6, 0, 0, 0],
    [0, 2, 0, 4, 7, 9, 8, 0, 1],
    [0, 8, 7, 3, 1, 2, 0, 4, 5],
    [0, 4, 2, 0, 9, 0, 1, 0, 0],
    [7, 6, 1, 2, 3, 5, 0, 0, 0],
    [0, 9, 0, 1, 0, 4, 3, 2, 7],
    [8, 0, 3, 7, 0, 0, 9, 0, 0],
    [2, 1, 0, 9, 5, 3, 7, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  ngOnInit(): void {}

  verifyAnswers(block: IBlock): boolean {
    const correctRow = this.checkRowCorrectness(block);
    const correctColumn = this.checkColumnCorrectness(block);
    const correctBlock = this.checkBlockCorrectness(block);

    if (correctRow && correctColumn && correctBlock) {
      return true;
    } else {
      return false;
    }
  }

  addNumberToGrid(block: IBlock) {
    let inputValue: number = parseInt(block.value);
    let correctAnswer = this.verifyAnswers(block);
    if (correctAnswer) {
      this.solvedGrid[parseInt(Array.from(block.id)[0])][
        parseInt(Array.from(block.id)[1])
      ] = inputValue;
    }
  }

  checkRowCorrectness(block: IBlock): boolean {
    if (
      this.solvedGrid[this.rowNumberFromId(block.id)].includes(
        parseInt(block.value)
      )
    ) {
      this.highlightWrongNumber(block);
      return false;
    } else {
      return true;
    }
  }

  checkColumnCorrectness(block: IBlock) {
    let columnToCheck = [];
    const arrayColumn = (arr: any, n: any) =>
      arr.map((x: { [x: string]: any }) => x[n]);
    columnToCheck.push(
      arrayColumn(this.solvedGrid, this.colNumberFromId(block.id))
    );

    if (columnToCheck[0].includes(block.value)) {
      this.highlightWrongNumber(block);
      return false;
    } else {
      console.log(
      );
      return true;
    }
  }

  checkBlockCorrectness(block: IBlock): boolean {
    const blockToCheck = [];
    const spliceFrom = this.getSpliceValues(
      this.colNumberFromId(block.id)
    );
    const copyOfgrid = JSON.parse(JSON.stringify(this.solvedGrid));
    let arrayTosplice = this.getSpliceValues(
      this.rowNumberFromId(block.id)
    );

    for (let row = 0; row < 3; row++) {
      blockToCheck.push(copyOfgrid[arrayTosplice].splice(spliceFrom, 3));
      arrayTosplice++;
    }

    const arrayToCheck = blockToCheck[0]
      .concat(blockToCheck[1])
      .concat(blockToCheck[2]);
    if (arrayToCheck.includes(parseInt(block.value))) {
      this.highlightWrongNumber(block);

      return false;
    } else {
      return true;
    }
  }

  highlightWrongNumber(block: IBlock) {
    const id: string = block.id;
    const selectedBlock = this.blockComponent.filter((x) => x.blockId == id);
    selectedBlock[0].block = null;
  }

  highlightArea(block: IBlock) {
    if (this.currentSelectedRow == null) {
      this.currentSelectedRow = parseInt(Array.from(block.value)[0]);
      let x = this.blockComponent.filter(
        (x) => x.blockId[0] == Array.from(block.id)[0]
      );
      x.map((x) => (x.isHiglited = true));
    }
    if (this.currentSelectedColumn == null) {
      this.currentSelectedColumn = parseInt(Array.from(block.value)[1]);
      let x = this.blockComponent.filter(
        (x) => x.blockId[1] == Array.from(block.id)[1]
      );
      x.map((x) => (x.isHiglited = true));
    }
  }

  removeHilightToArea(block: IBlock) {
    if (this.currentSelectedRow != null) {
      let x = this.blockComponent.filter(
        (x) => x.blockId[0] == Array.from(block.id)[0]
      );
      x.map((x) => (x.isHiglited = false));

      this.currentSelectedRow = null;
    }

    if (this.currentSelectedColumn != null) {
      let x = this.blockComponent.filter(
        (x) => x.blockId[1] == Array.from(block.id)[1]
      );
      x.map((x) => (x.isHiglited = false));

      this.currentSelectedColumn = null;
    }
  }

  colNumberFromId(id: string): number {
    return parseInt(Array.from(id)[1]);
  }

  rowNumberFromId(id: string): number {
    return parseInt(Array.from(id)[0]);
  }

  getSpliceValues(index: number): number {
    switch (true) {
      case index <= 2:
        return 0;
      case index > 2 && index <= 5:
        return 3;
      case index > 5:
        return 6;
      default:
        return 0;
    }
  }
}
