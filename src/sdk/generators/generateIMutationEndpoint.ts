import {generateSdkFor, IEndpoint, IGenerators, ISdk} from "@leight-core/leight";

export function generateIMutationEndpoint(sdk: ISdk): string {
	const name = sdk.endpoint.name.replace("Endpoint", "");
	const pair = (sdk.endpoint.generics?.[0] || "void") + ", " + (sdk.endpoint.generics?.[1] || "void");
	const api = sdk.endpoint.api;
	const query = sdk.endpoint.generics?.[2] || "void";
	const generics = query + ", " + pair;

	return `
import {FC} from "react";
import {createPostMutation, Form, IFormProps} from "@leight-core/leight";	
${sdk.imports.map(_import => `import {${_import.imports.join(", ")}} from ${_import.from};`).join("\n")}

${sdk.interfaces.map(item => item.source).join("\n")}

export type I${name}QueryParams = ${query};

export const use${name}Mutation = createPostMutation<I${name}QueryParams, ${pair}>("${api}");

export interface I${name}DefaultFormProps extends Partial<IFormProps<${generics}>> {
}

export const ${name}DefaultForm: FC<I${name}DefaultFormProps> = props => <Form<${generics}>
	useMutation={use${name}Mutation}
	{...props}
/>
`.trim();
}

const generators: IGenerators = {
	"IMutationEndpoint": generateIMutationEndpoint,
};

export const GenerateEndpoint: IEndpoint<void, any> = async (req, res) => {
	res.status(200).json(generateSdkFor("src/pages/api/**/*.ts", generators));
};

export default GenerateEndpoint;
