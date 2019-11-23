import * as _ from 'lodash';



export class ClassUtilities {

    public static getClassNameFor = (instance: any): string => {
        let name: string;

        const constructor = instance && instance.constructor ? instance.constructor : undefined;
        if (constructor) {
            name = (constructor as any).name;
        }
        if (_.isNil(name)) {
            if (constructor) {
                name = ClassUtilities.getClassNameFromSource(constructor.toString());
            }
        }
        return name;
    }
    /*
        This is necessary because IE does not support the name property
    */
    public static getClassNameFromSource = (source: string): string => {

        if (_.isNil(source)) {
            return undefined;
        }

        const matches = source.match(/function +(\S+) *\(/);

        if (!matches || matches.length < 2) {
            return undefined;
        }

        const name = matches[1];
        return name ? name : undefined;
    }

}
