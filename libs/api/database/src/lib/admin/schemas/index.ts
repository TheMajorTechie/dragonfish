import * as MongooseAutopopulate from 'mongoose-autopopulate';
import * as MongoosePaginate from 'mongoose-paginate-v2';
import { CaseFileSchema } from './case-files/case-file.schema';

//#region ---EXPORTS---

export { CaseFileSchema, CaseFileDocument } from './case-files/case-file.schema';
export { UserCaseFileSchema, UserCaseFileDocument } from './case-files/user-case-file.schema';
export { CommentCaseFileSchema, CommentCaseFileDocument } from './case-files/comment-case-file.schema';
export { ContentCaseFileSchema, ContentCaseFileDocument } from './case-files/content-case-file.schema';

//#endregion

//#region ---SCHEMA FACTORIES---

export async function setupCaseFileCollection() {
    const schema = CaseFileSchema;
    schema.plugin(MongooseAutopopulate);
    schema.plugin(MongoosePaginate);
    return schema;
}

//#endregion
