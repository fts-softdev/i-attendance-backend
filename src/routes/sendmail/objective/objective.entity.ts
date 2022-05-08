export class Objective {
    email: string = "";
    name: string = "";

    /**
     * convert body to Object
     * @name toJson
     * @param body 
     */
    toJson(body: { email: string, name: string }) {
        this.email = body.email;
        this.name = body.name;
    }
}