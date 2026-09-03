export type CareersSectionTab = 'history' | 'projects';

export type Preset = {
	disableHeroSection: boolean;
	disableProfileSection: boolean;
	disableCareersSection: boolean;
	disableIntroductionDiv: boolean;
	disableIntroductionSummaryDiv: boolean;
	disableIntroductionDescriptionDiv: boolean;
	disableIntroductionEmbedDiv: boolean;
	countRecentPostsEmbed: number;
	openCareersSectionTabOpened: CareersSectionTab;
};

export const defaultPreset: Preset = {
	disableHeroSection: false,
	disableProfileSection: false,
	disableCareersSection: false,
	disableIntroductionDiv: false,
	disableIntroductionSummaryDiv: false,
	disableIntroductionDescriptionDiv: false,
	disableIntroductionEmbedDiv: false,
	countRecentPostsEmbed: 5,
	openCareersSectionTabOpened: 'history'
};

const presets: Record<string, Partial<Preset>> = {
	cv: {
		disableHeroSection: true,
		countRecentPostsEmbed: 3,
		openCareersSectionTabOpened: 'projects'
	}
};

export const resolvePreset = (identifier: string | null): Preset => ({
	...defaultPreset,
	...(identifier ? presets[identifier] : undefined)
});
