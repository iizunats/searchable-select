import {AbstractComponent, Component, OnReady} from "iizuna";

@Component({
    selector: 'searchable-select'
})
export class SearchableSelectComponent extends AbstractComponent implements OnReady {
    onReady(): void {
        console.log(this.template);
    }
}
