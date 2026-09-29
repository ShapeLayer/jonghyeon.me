export type CareersSectionTab = 'history' | 'projects';
export type CareerTagDisplayMode = 'always' | 'collapse' | 'hide';
export type CareerTagDisplayModes = { always: CareerTagDisplayMode; collapse: CareerTagDisplayMode };
export type VerticalSpacing = {
	marginTop?: string;
	marginBottom?: string;
	paddingTop?: string;
	paddingBottom?: string;
};

export type Preset = {
	disableHeroSection: boolean;
	disableProfileSection: boolean;
	disableCareersSection: boolean;
	disableIntroductionDiv: boolean;
	disableIntroductionSummaryDiv: boolean;
	disableIntroductionDescriptionDiv: boolean;
	disableIntroductionEmbedDiv: boolean;
	heroVerticalSpacing: VerticalSpacing;
	profileVerticalSpacing: VerticalSpacing;
	introductionVerticalSpacing: VerticalSpacing;
	careersVerticalSpacing: VerticalSpacing;
	footerVerticalSpacing: VerticalSpacing;
	hideFooterBadges: boolean;
	hideFooterLocaleSelector: boolean;
	hideFooterCopyright: boolean;
	enableIntroductionScrollAdjustment: boolean;
	introductionDescriptionMarginTop: string;
	hideProfileCareersHr: boolean;
	profileCareersHrMargin: string;
	hideCareersFooterHr: boolean;
	careersFooterHrMargin: string;
	shownIntroductionParagraphs: number[];
	hideProfileEmailLink: boolean;
	hideProfileGithubLink: boolean;
	hideProfileBlogLink: boolean;
	hideProfileInstagramLink: boolean;
	countRecentPostsEmbed: number;
	openCareersSectionTabOpened: CareersSectionTab;
	careerItemHiddenOverrides: Record<string, boolean>;
	careerTagDisplayModes: CareerTagDisplayModes;
	popupTransitionDurationMs: number;
};

export const defaultPreset: Preset = {
	disableHeroSection: false,
	disableProfileSection: false,
	disableCareersSection: false,
	disableIntroductionDiv: false,
	disableIntroductionSummaryDiv: false,
	disableIntroductionDescriptionDiv: false,
	disableIntroductionEmbedDiv: false,
	heroVerticalSpacing: {},
	profileVerticalSpacing: {},
	introductionVerticalSpacing: {},
	careersVerticalSpacing: {},
	footerVerticalSpacing: {},
	hideFooterBadges: false,
	hideFooterLocaleSelector: false,
	hideFooterCopyright: false,
	enableIntroductionScrollAdjustment: true,
	introductionDescriptionMarginTop: '4em',
	hideProfileCareersHr: false,
	profileCareersHrMargin: '5rem auto',
	hideCareersFooterHr: false,
	careersFooterHrMargin: '5rem auto',
	shownIntroductionParagraphs: [0, 1, 2],
	hideProfileEmailLink: false,
	hideProfileGithubLink: false,
	hideProfileBlogLink: false,
	hideProfileInstagramLink: false,
	countRecentPostsEmbed: 5,
	openCareersSectionTabOpened: 'history',
	careerItemHiddenOverrides: {},
	careerTagDisplayModes: { always: 'always', collapse: 'collapse' },
	popupTransitionDurationMs: 500
};

const presets: Record<string, Partial<Preset>> = {
	cv: {
		disableHeroSection: true,
		popupTransitionDurationMs: 250,
		hideFooterBadges: true,
		disableIntroductionEmbedDiv: true,
		introductionVerticalSpacing: { marginTop: '30px' },
		enableIntroductionScrollAdjustment: false,
		hideProfileCareersHr: true,
		hideCareersFooterHr: true,
		shownIntroductionParagraphs: [1],
		hideProfileInstagramLink: true,
		openCareersSectionTabOpened: 'projects',
		careerItemHiddenOverrides: {
			'project-gfm2polygon-statement': false,
			'works-typst-maintaining': true,
			'work-imagelab': true,
			'work-ielab': true,
			'work-cnu-ucc-working-scholarship': true
		},
		careerTagDisplayModes: { always: 'always', collapse: 'hide' }
	}
};

export const resolvePreset = (identifier: string | null): Preset => ({
	...defaultPreset,
	...(identifier ? presets[identifier] : undefined)
});
