import {createFetchHook} from "../hook/createFetchHook";
import {createFetchPage} from "./createFetchPage";
import {createPost} from "./createPost";

/**
 * Somehow crudish method returning array of methods for doing:
 *
 * - CREATE (using POST)
 * - UPDATE (using POST)
 * - DELETE (using POST)
 * - PAGE (using POST - just simple collection paging)
 * - FETCH (using GET - fetch a resource by an ID)
 *
 * @param id link id (at the end "id + create", "id + update", ...)
 * @param page could have different format as it could be page of another entity (for example user.invoice.page)
 * @return {function[]}
 */
export const createCrud = (id: string, page?: string) => ([
	createPost(id + ".create"),
	createPost(id + ".update"),
	createPost(id + ".delete"),
	createFetchPage(page || id + ".page"),
	createFetchHook(id + ".fetch"),
]);
