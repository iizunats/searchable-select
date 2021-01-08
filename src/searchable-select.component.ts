import {
    AbstractComponent,
    Component,
    ComponentFactory,
    ElementAttribute,
    EventListener,
    GlobalEventListener,
    OnReady
} from "iizuna";
import {SearchableSelectListItemComponent} from "./searchable-select-list-item.component";
import {INPUT, LIST, SEARCHABLE_SELECT, SELECT} from "./selector.const";
import {LIST_ITEM_CLICK_EVENT} from "./event.const";
import {filterOptionsCollection, formatSearchString} from "./functions";


@Component({
    selector: SEARCHABLE_SELECT,
    childrenSelectors: [
        INPUT,
        SELECT,
        LIST
    ]
})
export class SearchableSelectComponent extends AbstractComponent implements OnReady {
    private selectOptions: HTMLOptionsCollection = null;
    private static counter = 0;
    private internalId = '';

    @ElementAttribute()
    private idSeparator = '%';

    onReady(): void {
        const targetSelect = this.children[SELECT][0] as HTMLSelectElement;
        this.selectOptions = targetSelect.options;
        this.internalId = this.identifier || (SearchableSelectComponent.counter++).toString();
        this.hideList();
    }

    @GlobalEventListener(LIST_ITEM_CLICK_EVENT)
    selectItem(document: any, customEvent: any) {
        const split = customEvent.value.split(this.idSeparator);
        if (split[0] === this.internalId) {
            const select = this.children[SELECT][0] as HTMLSelectElement;
            this.hideList();
            select.value = split[1];
            // Update the value of the search input
            this.children[INPUT][0].value = select.selectedOptions[0].label;
        }
    }

    @GlobalEventListener('click')
    clickOutsideList(element: any, event: MouseEvent) {
        if (!this.element.contains(event.target as Node)) {
            this.hideList();
        }
    }

    @EventListener('keyup focus', INPUT)
    updateList(input: HTMLInputElement) {
        // Filters the OptionsCollection by the given search string
        this.children[LIST][0].innerHTML = this.filterOptionsCollection(formatSearchString(input.value))
            // Map the options into a HTML list element
            .map((item) => this.optionElementToListItem(item))
            // Now join them together and replace the innerHTML of the list
            .join('');
        ComponentFactory.registerComponents([SearchableSelectListItemComponent], this.children[LIST][0]);
        this.showList();
    }

    private filterOptionsCollection(value: string): HTMLOptionElement[] {
        // If the value is a empty string, return undefined and therefore ignore the filter function
        const callback = value !== '' ? (item: HTMLOptionElement) => {
            return formatSearchString(item.innerText).indexOf(value) !== -1;
        } : undefined;
        return filterOptionsCollection(this.selectOptions, callback);
    }

    private optionElementToListItem(item: HTMLOptionElement): string {
        return this.template.render({
            value: this.internalId + this.idSeparator + item.value,
            text: item.innerText
        });
    }

    private hideList() {
        this.children[LIST][0].classList.remove('is-visible');
        this.children[LIST][0].classList.add('is-hidden');
    }

    private showList() {
        this.children[LIST][0].classList.add('is-visible');
        this.children[LIST][0].classList.remove('is-hidden');
    }
}
