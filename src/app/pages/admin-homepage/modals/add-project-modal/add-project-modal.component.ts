import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../../models/types';
import { IonModal } from '@ionic/angular';
import { TypeaheadComponent } from 'src/app/components/typeahead/typeahead.component';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent  {

  @ViewChild('memberModal', { static: true }) memberModal!: IonModal;
  

 
  constructor(private modalController: ModalController) {}

  selectedMembersText = '0 Items';
  selectedMembers: string[] = [];

  members: Item[] = [
    { text: 'Apple', value: 'apple' },
    { text: 'Apricot', value: 'apricot' },
    { text: 'Banana', value: 'banana' },
    { text: 'Blackberry', value: 'blackberry' },
    { text: 'Blueberry', value: 'blueberry' },
    { text: 'Cherry', value: 'cherry' },
    { text: 'Cranberry', value: 'cranberry' },
    { text: 'Grape', value: 'grape' },
    { text: 'Grapefruit', value: 'grapefruit' },
    { text: 'Guava', value: 'guava' },
    { text: 'Jackfruit', value: 'jackfruit' },
    { text: 'Lime', value: 'lime' },
    { text: 'Mango', value: 'mango' },
    { text: 'Nectarine', value: 'nectarine' },
    { text: 'Orange', value: 'orange' },
    { text: 'Papaya', value: 'papaya' },
    { text: 'Passionfruit', value: 'passionfruit' },
    { text: 'Peach', value: 'peach' },
    { text: 'Pear', value: 'pear' },
    { text: 'Plantain', value: 'plantain' },
    { text: 'Plum', value: 'plum' },
    { text: 'Pineapple', value: 'pineapple' },
    { text: 'Pomegranate', value: 'pomegranate' },
    { text: 'Raspberry', value: 'raspberry' },
    { text: 'Strawberry', value: 'strawberry' },
  ];

  private formatData(data: string[]) {
    if (data.length === 1) {
      const member = this.members.find((member) => member.value === data[0]);
      if (member) {
        return member.text;
      }
    }
  
    return `${data.length} items`;
  }
  
  

  memberSelectionChanged(members: string[]) {
    this.selectedMembers = members;
    this.selectedMembersText = this.formatData(this.selectedMembers);
    this.memberModal.dismiss();
  }



  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss({ /* zmienne do przekazania, te z formularzy */ }, 'confirm');
  }
}

  

  
