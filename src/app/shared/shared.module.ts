import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from "./components/data-grid/data-grid.component";
import { DataGridColumnDirective, DataGridDetailDirective } from "./directives/data-grid-column.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormInputComponent } from "./components/form-input/form-input.component";
import { ModalComponent } from './components/modal/modal.component';
import { FormRangeComponent } from './components/form-range/form-range.component';
import { ModalFooterDirective } from './directives/modal.directive';
import { IconComponent } from './components/icon/icon.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FilterByPipe } from './pipes/filter-by.pipe';


@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        DataGridComponent,
        FormInputComponent,
        DataGridColumnDirective,
        DataGridDetailDirective,
        FormRangeComponent,
        ModalFooterDirective,
        IconComponent,
        FormSelectComponent,
        FilterByPipe
    ],
    declarations: [
        DataGridComponent,
        DataGridColumnDirective,
        DataGridDetailDirective,
        FormInputComponent,
        FormRangeComponent,
        ModalComponent,
        ModalFooterDirective,
        IconComponent,
        FormSelectComponent,
        ConfirmComponent,
        FilterByPipe
    ]
} )
export class SharedModule
{
}
