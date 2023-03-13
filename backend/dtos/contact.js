export class ContactDto {
    name;
    phone;
    id;

    constructor(model) {
        this.name = model.name;
        this.phone = model.phone;
        this.id = model._id
    }

}