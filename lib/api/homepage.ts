'use server';

import { create } from '~lib/fetchData';

const fetch = create();

export interface HomepageBlockPage {
  code: number;
  data?: {
    blocks?: Block[];
    pageConfig?: PageConfig;
  };
  message?: string;
}

/**
 * 网易云首页 block 流（约 15 个区块）。
 */
export const getHomepageBlocks = async (): Promise<Block[] | null> => {
  const data = (await fetch({
    url: '/homepage/block/page'
  })) as HomepageBlockPage | null;

  if (!data?.data?.blocks?.length) return null;
  return data.data.blocks;
};
