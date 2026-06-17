/**
 * Parent user as returned by auth APIs (`data.user`), stored in full in Redux.
 */
export type AuthUser = Record<string, unknown>;

/**
 * One child document from `mobile/profile` `childUsers` — stored in full when selected.
 */
export type SelectedChildUser = Record<string, unknown> & {
    _id?: string;
    id?: string;
    name?: string;
    age?: number;
    image?: unknown;
};
