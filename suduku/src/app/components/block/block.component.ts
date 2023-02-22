import { IBlock } from './../../utils/interface/iblock';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {

  @Input() isDisabled!: boolean;
  @Input() isHiglited!: boolean;
  @Input() block!: number | null;
  @Input() blockId!: string;
  @Input() isAssigned!: boolean;
   
  @Output() newBlockValue = new EventEmitter<IBlock>();
  @Output() removeHighlightValue = new EventEmitter<IBlock>();
  @Output() addHighlightValue = new EventEmitter<IBlock>();


  constructor() { }
  performMove(action: string, value: Event) {
    const block = value.target as HTMLInputElement

    let newBlock: IBlock = {
      value: block.value,
      id: block.id,
    }
    switch (action) {
      case "addValue":
        this.newBlockValue.emit(newBlock);
        break;
      case "highLightArea":
        this.addHighlightValue.emit(newBlock);
        break;
      case "removeHighLightArea":
        this.removeHighlightValue.emit(newBlock)
        break
    }
  } 
}


