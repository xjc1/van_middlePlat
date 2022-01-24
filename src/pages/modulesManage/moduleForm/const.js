import { modulesContentType } from '@/utils/constantEnum';

export const defaultContentSort = Object.entries(modulesContentType).map(([, k]) => k);
