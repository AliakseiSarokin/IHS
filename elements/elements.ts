import {by, element, ElementArrayFinder, ElementFinder} from "protractor";

export const administrationElements: any = {
    manageUsers: {
        modifyOwnerShade: {
            userRoleCheckboxLabels: element.all(by.css('.role-checkbox label')),
            userRoleCheckboxInputs: element.all(by.css('.role-checkbox input')),
        },
        reassignItemsShade: {
            itemsCheckboxLabels: element.all(by.css('.form-group .checkbox label')),
            itemsCheckboxInputs: element.all(by.css('.form-group .checkbox input')),
            checkAllLabel: element.all(by.css('[for="checkall"]')),
            checkAllInput: element.all(by.css('#checkall')),
            userRadioLabels: element.all(by.css('.radio label')),
            userRadioInputs: element.all(by.css('.radio input')),
        }
    },

    viewUsers: {
        contactShade: {
            subjectField: element(by.css('.subject-input-wrapper > input')),
            emailField: element(by.css('.quick-search-text')),
            messageField: element(by.css('textarea')),
            counter: element.all(by.className('text-right shim-top-sm')),
            emailByName: function (name: string) {
                return element(by.cssContainingText('.toolbar-panel.open .cap-string-val', name))
            },
        }
    },
    customAttributes: {
        attributesBody: element(by.css('.custom-table-body')),
        simpleCheckbox: element.all(by.css('.cbx-ct input')),
        rowInput: element.all(by.css('.flex-row .flex-2 input')),
        headers: element.all(by.css('.flex-cell strong')),
        displayInput: element(by.css('.attribute-display')),
        rowName: function (rowNumber: number) {
            return element.all(by.css('.custom-table-row')).get(rowNumber).all(by.css('.flex-cell')).first()
        },
        rowMaxLength: function (rowNumber: number) {
            return element.all(by.css('.custom-table-row')).get(rowNumber).all(by.css('.flex-cell')).get(1)
        },
        displayLabel: function (rowNumber: number) {
            return element.all(by.css('.custom-table-row')).get(rowNumber).element(by.css('.custom-table-display'))
        },
        advancedReports: function (rowNumber: number) {
            return element.all(by.css('.custom-table-row')).get(rowNumber).all(by.css('.cbx-ct input')).get(0)
        },
        emailAlerts: function (rowNumber: number) {
            return element.all(by.css('.custom-table-row')).get(rowNumber).all(by.css('.cbx-ct input')).get(1)
        },
        import: function (rowNumber: number) {
            return element.all(by.css('.custom-table-row')).get(rowNumber).all(by.css('.cbx-ct input')).get(2)
        },
        bomDetails: function (rowNumber: number) {
            return element.all(by.css('.custom-table-row')).get(rowNumber).all(by.css('.cbx-ct input')).get(3)
        },
        bomDetailCheckboxLabel: element.all(by.css('[for="bomDetails"]')),
        bomDetailCheckboxInput: element.all(by.css('[name="bomDetails"]')),
    },

    cplCustomAttributes: {
        headers: element.all(by.css('.attributes-ct > div:nth-child(4) .flex-row strong')),
        renameHeaders: element.all(by.css('.flex-row strong')).first(),
        rowName: function (rowNumber: number) {
            return element.all(by.css('.custom-table-body .flex-row:not(.shim-bottom-sm)')).get(rowNumber)
                .element(by.css('.flex-1:not(.text-center):not(.flex-center)'))
        },
        rowMaxLength: function (rowNumber: number) {
            return element.all(by.css('.custom-table-body .flex-row:not(.shim-bottom-sm)')).get(rowNumber)
                .element(by.css('.flex-1.text-center'))
        },
        displayLabel: function (rowNumber: number) {
            return element.all(by.css('.custom-table-body .flex-row:not(.shim-bottom-sm)')).get(rowNumber).element(by.css('.custom-table-display'))
        },
        bomDetails: function (rowNumber: number) {
            return element.all(by.css('.custom-table-body .flex-row:not(.shim-bottom-sm)')).get(rowNumber).all(by.css('.cbx-ct input')).get(0)
        },
    },
    distributors: {
        grid: element(by.css('cap-grid-wrapper.non-movable-columns')),
        title: element(by.css('.flex-container>h2.shim-bottom'))
    },
};

export const homeElements: any = {
    instructionPanelHeader: element(by.css('.Instruction_panel_head')),
    panelTitles: element.all(by.css('.panel-body>h2')),
    bomsLinks: element.all(by.css('.tile-center .panel-body')).get(0).all(by.css('a')),
    reportingLinks: element.all(by.css('.tile-center .panel-body')).get(1).all(by.css('a')),
    alertsLinks: element.all(by.css('.tile-center .panel-body')).get(2).all(by.css('a')),
    partSearchLinks: element.all(by.css('.tile-center .panel-body')).get(3).all(by.css('a')),
    myDashboardLinks: element.all(by.css('.tile-center .panel-body')).get(4).all(by.css('a')),
    otherTasksLinks: element.all(by.css('.tile-center .panel-body')).get(5).all(by.css('a')),
    learnMoreLinks: element.all(by.css('.tile-center .panel-body')).get(6).all(by.css('a')),
    corparateDataLinks: element.all(by.css('.tile-center .panel-body')).get(7).all(by.css('a')),
    bomsPanelImage: element.all(by.css('.img-container')).get(0),
    reportingPanelImage: element.all(by.css('.img-container')).get(1),
    alertPanelImage: element.all(by.css('.img-container')).get(2),
    searchPanelImage: element.all(by.css('.img-container')).get(3),
    dashboardPanelImage: element.all(by.css('.img-container')).get(4),
    otherTasksPanelImage: element.all(by.css('.img-container')).get(5),
    learnMorePanelImage: element.all(by.css('.img-container')).get(6),
    corparatePartListPanelImage: element.all(by.css('.img-container')).get(7),
};

export const bomVaultElements = {

    bomTree: {
        openedFolder: element(by.css('.folder-opened')),
        bomInfoIconByTitle: function (rowNumber: number, title: string) {
            return element.all(by.css(`[row-index="${rowNumber}"]`)).element(by.css(`[title="${title}"]`))
        },
        bomTreeRowCss: '.group-node',
        bomTreeRowsNewGrid: element.all(by.css('.ag-cell-last-left-pinned')),
        bomTreeFoldersNewGrid: element.all(by.css('.group-node .not-link')),
        bomTreeRows: element.all(by.css('.group-node')),
        bomTreeRowsAll: element.all(by.css('.group-node a span')),
        bomTreeFolders: element.all(by.css('.group-node .not-link')),
        bomTreeBoms: element.all(by.css('.group-node .node-title:not(.not-link)')),
        vaultLeftNav: element.all(by.css('label.text-elipsis')),
        addToReportLeftNavButton: element.all(by.css('div[id=\'collapseOne\'] button')),
        vaultLeftNavRecentBOMs: element.all(by.css('.collapse label.text-elipsis')),
        bomTreeRowsBoms: function (number: number) {
            return element.all(by.css('.group-node')).get(number).element(by.css('.group-node .node-title:not(.not-link)'))
        },
        bomTreeRowsFolder: function (number: number) {
            return element.all(by.css('.group-node')).get(number).element(by.css('.not-link'))
        },
        bomTreeFolderName: function (name: string) {
            return element.all(by.cssContainingText('.not-link', name))
        },
        bomTreeBomName: function (name: string) {
            return element.all(by.cssContainingText('.node-title:not(.not-link)', name))
        },
        indenturedBomIconByRowNumber: function (rowNumber: number) {
            return element.all(by.css('.group-node')).get(rowNumber).element(by.css('[*|href="#ihs-icon-indentured-bom-folder-not-mine-closed"]'))
        },
        addNewFolderSubtitle: element(by.css('.modal-body .form-group:nth-child(1) strong')),
        addNewFolderFieldLabels: element.all(by.css('.modal-body .form-group label')),
        addNewFolderFieldInputs: element.all(by.css('.modal-body .form-group input')),
        addNewFolderCounter: element(by.css('#newfolderdesc +div>span')),
        descriptionInput: element(by.css('#newfolderdesc')),
        expandFolderIconCss: '.ui-grid-icon-plus-squared2',
        expandFolderIconNewGridCss: '.icon-container.expand-trigger-icon',
        // expandFolderIcon: element(by.css('.ui-grid-icon-plus-squared2')),
        expandFolderIconNewGrid: element.all(by.css('.icon-container.expand-trigger-icon')),

        folderPlusIconSvgByRowNumber: function (rowNumber: number) {
            return element.all(by.css('.icon-container.expand-trigger-icon')).get(rowNumber).element(by.css('[*|href="#ihs-icon-bom-tree-icon-plus"]'))
        },
        BOMExpandAllSvgByRowNumber: function (rowNumber: number) {
            return element.all(by.css('.icon-container.expand-all-trigger-icon')).get(rowNumber).element(by.css('[*|href="#ihs-icon-bom-tree-open-all"]'))
        },
        expandAllIconNewGrid: element.all(by.css('.icon-container.expand-all-trigger-icon')),

        modifyFolderFieldLabels: element.all(by.css('.modal-body .control-label')),
        modifyFolderFieldInputs: element.all(by.css('.modal-body .control input')),
        modifyFolderNewDesc: element(by.css('#newfolderdesc')),
        modifyFolderCurrentDesc: element.all(by.css('.control .form-control')),
        modifyFolderCounter: element.all(by.css('.pull-right>span')),
        expandedItem: element.all(by.css('#ihs-icon-bom-tree-icon-minus')),
        modifyOwnerShade: {
            tabColumnHeaders: element.all(by.css('tr th')),
            tabRows: element.all(by.css('tr td')),

        },

        moveFolderShade: {
            shadeText: element.all(by.css('.open .flex-container p')),
            title: element(by.css('#title')),
        },

        moveBomShade: {
            bomList: element.all(by.css('move-bom-shade li')),
            title: element(by.css('move-bom-shade h2')),
            shadeText: element.all(by.css('move-bom-shade p')),
        }
    },

    bomTreeParts: {
        bomTreeRows: element.all(by.css('.ag-row-position-absolute')),
        bomTreePartsWait: element.all(by.className('group-node')),
        automationFolder: element(by.xpath('.//span[text()="AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1"]/parent::a/preceding-sibling::div')),
        bomTreeLinks: element.all(by.css('a.node-title:not(.not-link)')),
        bomNameLink: element.all(by.css('.node-title')),
        bomNames: element.all(by.css('.node-title:not(.not-link)')),
        bomTreePartsRow: element.all(by.css('.tree-grid-wrapper-ct.flex-1 .ag-center-cols-container [row-index], .ui-grid-row')),
        bomTreePartsRowHighlighted: element.all(by.css('.cap-hightlighted-cell')),
        bomTreePartsRowCss: '.group-node',
        expandFolderByName: function (name: string) {
            return element.all(by.xpath(`//span[contains(text(), \'${name}\')]/../../div[contains(@class, \'expand-trigger-icon\')]`))
        },
        expandFolderIconCss: '.icon-container.expand-trigger-icon',
        expandFolderIconFirst: element(by.css('.icon-container.expand-trigger-icon')),
        expandFolderIcon: element(by.css('.expand-icon')),
        expandFolderIcons: element.all(by.css('.expand-icon.expand')),
        rowItems: element.all(by.css('.node-title')),
        indenturedBomIconByRowNumber: function (rowNumber: number) {
            return element.all(by.css('.group-node')).get(rowNumber).element(by.css('[*|href="#ihs-icon-indentured-bom-folder-not-mine-closed"]'))
        },
        subAssembly: element.all(by.xpath('//*[name()=\'use\' and @*=\'#ihs-icon-assembly-or-sub-assembly\']/ancestor::div[@class=\'group-node\']/a ')),
        indenturedExpandAllButton: element.all(by.css('.expand-all-trigger-icon')),

    },

    bomTreeFilter: {
        filterBody: element(by.css('.filter-panel-body')),
        bomTreeFilterIcon: element.all(by.css('.icon-search ng-transclude, [svgclass="icon-search"], [svg-class="icon-search"]')).get(0),
        bomTreeFilterTitle: element(by.css('.drag-header')),
        bomTreeFilterXButton: element(by.css('.close-panel')),
        bomTreeFilterSubtitle: element(by.css('.tree-filter-panel .header-text')),
        iconsType: element.all(by.css('div.icon-type')),
        iconsTypeText: element.all(by.css('.legend-item span')),
        iconDefenition: element(by.css('.filter-panel-body .shim-bottom-mini')),
        bomTreeFilterSearchField: element(by.css('.filter-panel-body .relative input')),
        bomTreeFilterSearchFieldXButton: element(by.css('.filter-panel-body [ewbsvguse="ihs-icon-x"]')),
        goButton: element(by.css('.left-column div.search-ct > button')),
        searchResult: element(by.css('.right-column')),
        noResult: element(by.css('.no-record-ct')),
        treeIcons: element.all(by.css('.custom-icon')),
        bomTreeFilterActive: element(by.css('.tree-filter-panel.active')),
        searchItem: element.all(by.css('mark')),
        folderOrBomName: element.all(by.css('mark')),
        folderOrBomNameRow: element.all(by.css('.filter-panel-body .ag-center-cols-container .ag-row > div')),
        checkbox: element.all(by.css('.filter-panel-body .grid-checkbox-item')),
        searchRows: element.all(by.css('.path-list-item')),
        bomTreeRows: element.all(by.css('div.cap-hightlighted-cell span')),
    },

    vaultSummary: {
        tableHeaders: element.all(by.css('h2.top-4')),
        vaultGrid: element(by.css('.vault-grids')),
        columnHeadersByTableNumber: function (tableNumber: number) {
            return element.all(by.css('.summary-table-header')).get(tableNumber).all(by.css('div'))
        },
        tableKeyByTableNumber: function (tableNumber: number) {
            return element.all(by.css('.summary-table-body.summary-table-body')).get(tableNumber)
                .all(by.css('.summary-table-table-content div:nth-child(odd)'))
        },
        tableValueByTableNumber: function (tableNumber: number) {
            return element.all(by.css('.summary-table-body')).get(tableNumber)
                .all(by.css('.summary-table-table-content div:nth-child(even)'))
        },
        alertSummaryValues: element.all(by.css('.summary-table-body')).get(1)
            .all(by.css('.summary-table-table-content div:not(.group-title):nth-child(3n-2)')),
        alertSummarySubHeaders: element.all(by.css('.summary-table-body')).get(1)
            .all(by.css('.summary-table-table-content .group-title'))
    }
};

export const importElements = {
    aboutImport: element(by.css('.import-page.flex-container')),
    importedBomName: (bomImportName: string): ElementFinder => {
        return element.all(by.cssContainingText('.cap-formatter-cell', bomImportName)).first();
    },
    importHistoryTabBody: element(by.css('.tab-pane.fade.in.active')),
    indenturedBomXbutton: element(by.css('.ag-row-first .expand-trigger-icon')),
    hideLink: element(by.css('.hide-link')),
    previewAndValidateButton: element(by.css('.btn-deemphasized.shim-right-mini')),
    importLinkMeganav: element.all(by.css('.navbar-nav.navbar-blue>li')).get(2),
    step1EnableBox: element(by.className('row control-panel')),
    savedConfRows: element.all(by.css('import-configuration-list .grid-item')),
    savedConfNameByRowNumber: function (rowNumber: number) {
        return element.all(by.css('import-configuration-list .grid-item')).get(rowNumber)
            .all(by.css('.flex-1')).first();
    },
    savedConfDescByRowNumber: function (rowNumber: number) {
        return element.all(by.css('import-configuration-list .grid-item')).get(rowNumber)
            .all(by.css('.flex-1')).last();
    },
    savedConfRadioButtons: element.all(by.css('import-configuration-list .radio label')),
    destFolderSummary: element(by.css('.data-ct .summary-item span')),
    uploadFileInput: element(by.css('#uploadFileInputId')),
    optionTitle: element.all(by.css('.tab-title, .data-ct>h2')),
    optionModalTitle: element(by.css('.title-text')),
    optionModalBody: element(by.css('.import-config-body')),
    optionModalX: element(by.css('.import-config-header .pull-right.pointer')),
    stepsLabels: element.all(by.css('.step .step')),
    aboutColumnTitles: element.all(by.css('.col-md-3>h3')),
    descSteps: element.all(by.css('.col-md-3 p')),
    browseButton: element(by.css('.import-form-dropzone label')),
    dragAndDropText: element(by.css('.import-form-dropzone p')),
    doNotShowCheckboxLabel: element(by.css('.flex-justify-center label')),
    doNotShowCheckboxLabelCPL: element(by.css('.text-center label')),
    cancelModalTextP: element(by.css('.modal-body .col-md-12 div')),
    cancelModalText: element.all(by.css('.modal-body .col-md-12')),
    cancelModalImportText: element.all(by.css('.modal-body p')),
    analyzeModalText: element(by.cssContainingText('.modal-body .col-md-12', 'Your CPL is being analyzed. Thank you for your patience.')),
    invalidFileModalTitle: element(by.cssContainingText('.modal-title', 'Import file is not valid.')),
    bomNameField: element(by.id('import-bom-name')),
    descriptionField: element(by.id('description')),
    columnMappDropdown: element.all(by.css('.dropdown-toggle')),
    columnMappingLine: element.all(by.css('.col-md-3.padding-top-8')),
    optionsContainer: element.all(by.css('.bom-config-summary-ct .config-data-ct')),
    columnNumberOnRow: element(by.css('#columnLabelRowNum')),
    viewImportConfigrationIcon: element(by.css('.import-settings-gutter')),
    worksheet: element(by.css('#worksheet')),
    worksheetOptions: element.all(by.css('#worksheet option')),
    worksheetSelectedOption: element(by.css('select#worksheet')),
    worksheetOptionCss: 'select#worksheet',
    workSheetLabel: element.all(by.css('.field-set-ct>.bomform-title')).get(0),
    savedConfName: element(by.css('import-panel .edit-field input')),
    savedConfDesc: element(by.css('import-panel .edit-field textarea')),
    moveTo1StepImport: element.all(by.css('.indicator .pointer')).get(1),
    validationErrorTitle: element(by.css('.info-panel h2')),
    alertNotifications: {
        checkboxInputs: element.all(by.css('.shim-left .checkbox input')),
    },
    useFileNameCheckboxInput: element.all(by.css('#useFileName')),
    useFileNameCheckboxLabel: element.all(by.css('[for="useFileName"]')),
    importOptions: {
        kbRadioButtonLabels: element.all(by.css('.option-ct .radio label')),
        kbRadioButtonInputs: element.all(by.css('.option-ct .radio input')),
        defaultCheckboxLabels: element.all(by.css('.option-ct .checkbox label')),
        defaultCheckboxInputs: element.all(by.css('.option-ct .checkbox input')),
        cplCheckboxLabels: element.all(by.css('.flex-1 .checkbox label')),
        cplCheckboxInputs: element.all(by.css('.flex-1 .checkbox input')),
        amlCheckboxInput: element(by.id('userInternalPartNum')),
        amlCheckboxLabel: element.all(by.css('.indented-item.checkbox>label')).get(2),
    },
    destinationFolder: {
        folderNameInput: element(by.css('#newfoldername')),
        path: element.all(by.css('.summary-item')).get(0),
    },
    alertNotificationOptions: {
        alertNotifSubtitle: element(by.css('.config-title-row')),
        alertNotifOptionSegmentTitle: element.all(by.css('.flex-row >div >strong')),
        emailInput: element(by.css('[name="email"]')),
        emailValidationMessage: element.all(by.css('.email-validation-ct .warning')),
        emailCharactersCount: element(by.css('.email-validation-ct .chars-remaining')),
        addedEmail: element.all(by.css('.email-item')),
        alertNotifOptions: element.all(by.css('.bom-config-summary-ct')).get(2),
        alertNotifCheclboxesLabel: element.all(by.css('.import-config-body .checkbox>label')),
        alertNotifCheclboxesInput: element.all(by.css('.import-config-body .checkbox>input')),
    },
    optionalAttributes: {
        configurationItem: element.all(by.css('.config-data-ct')),
        optionalAttriutesSubtitle: element(by.css('.import-config-panel h2')),
        optionalAttriutesFieldTitles: element.all(by.css('.label-container label')),
        optionalAttriutesFieldInputs: element.all(by.css('dom-custom-node input')),
        optionalAttriutesFieldCounters: element.all(by.css('.characters-left')),
        optionalAttributesOptions: element.all(by.css('.bom-config-summary-ct')).get(5).element(by.css('.config-data-ct')),
        optionalAttributesShowMore: element.all(by.css('.config-summary-ct')).get(5).element(by.css('.fake-link')),
        optionalAttributesText: element.all(by.css('.config-summary-ct')).get(5).all(by.css('.summary-item:not(.ng-hide)')),
    },
};

export const cplImportElements = {
    cplFileInputId: element(by.css('#uploadFileInputId')),
    importTypeRadioButtonsLabel: element.all(by.css('.data-ct .radio label')),
    importTypeRadioButtonsInput: element.all(by.css('.data-ct .radio input')),
    optionsContainer: element.all(by.css('.cpl-config-summary-ct .config-data-ct')),
    optionsTitles: element.all(by.css('.data-ct>h2')),
    importOptionsText: element.all(by.css('.cpl-config-summary-ct')).get(0).element(by.css('.shim-top-sm')),
    alertNotifOptions: element.all(by.css('.cpl-config-summary-ct')).get(2).all(by.css('.summary-item')),
    importOptionsCheckboxLabel: element(by.css('.cpl-config-summary-ct .checkbox label')),
    importOptionsCheckboxInput: element(by.css('.cpl-config-summary-ct .checkbox input')),
    validationErrorTitle: element(by.css('.info-panel h2'))
};

export const viewMfrPref = {
    import: {
        importWait: element(by.className('import-content-wrap')),
        uploadedFileName: element(by.css('.control-panel>span')),
        dropdownLabels: element.all(by.css('label.flex-0')),
    },

    mfrPref: {
        fieldLabels: element.all(by.css('.data-row>label')),
        searchForMatchInput: element(by.css('.input-group.col-md-12>input')),
        commentsField: element(by.css('textarea')),
        commentFieldCounter: element.all(by.className('shim-top-sm')),
        mfrNameField: element.all(by.css('.data-row input')).get(2),
        matchMfrName: element.all(by.css('.data-row input')).get(1),
        mfrIdField: element.all(by.css('.data-row input')).get(0),
        shadeRadioButtonsLabel: element.all(by.css('.shade-content .radio label')),
        shadeRadioButtonsInput: element.all(by.css('.shade-content .radio input')),
        newAddedMfr: function (text: string) {
            return element(by.cssContainingText('.ag-cell-value', text))
        },
        shadeTypeAhead: element(by.css('.shade-content type-ahead input')),
        searchForMatchCell: element.all(by.css('.cap-formatter-cell')),
        filterInput: element(by.css('.form-control.input-sm')),
        unsotr: element(by.css('.btn.btn-primary.btn-sm')),
    }
};

export const pageTitles = {
    pageTitle: element(by.css('h2.pull-left')),
    pageTitleShim: element(by.css('.shim-bottom>h2, h2.shim-bottom')),
    pageTitleShim2: element(by.css('h2.shim-bottom')),
    generereReportTitle: element.all(by.css('.report-header > h2')),
    generereReportTitleWithBom: element.all(by.css('.report-header h2')),
    searchPageTitle: element(by.css('.home-content li.active h1')),
    aboutImportPageTitle: element(by.css('.shim-bottom-sm>h2')),
    homePageTitle: element(by.css('.shim-bottom h2')),
    singleBomPageTitle: element(by.css('h2.text-left')),
    multipleReports: element(by.css('.pseudo-link.report-name')),
    importMfrTitle: element(by.css('h2.shim-bottom-sm')),
    savedSearchesTitle: element(by.css('.text-left>h1')),
    settingsTitle: element(by.css('h1.pull-left')),
    moduleSettingsTitle: element(by.css('.settings-module>h1, .settings-module>div>h1')),
};

export const videoSliderElements = {
    videoBox: element.all(by.css('.slider-component-ct')),
    videoSliderTitle: element.all(by.css('.video-details>h2')),
    slider: element(by.css('.slider-component-ct.in')),
    videoTab: element(by.css('span.video-switch')),
    videoModal: element(by.css('video')),
    videoTitles: element.all(by.css('.video-title')),
    videoTitleByName: (name: string): ElementFinder => {
        return element(by.cssContainingText('.video-title', name))
    },
    viewInSeparateWindow: element.all(by.cssContainingText('.video-details a', 'View in Separate Window'))
};

export const reportElements = {
    reports: {
        advancedReportNames: element.all(by.css('.ag-pinned-left-cols-container [row-index] .cap-formatter-cell')),
        advancedReportNamesByIndex: (index: number) => {
            return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${index}"] .cap-formatter-cell`)).first()
        },
        stepTitles: element.all(by.className('col-md-11')),
        advancedReports: element.all(by.css('.ag-pinned-left-cols-container [row-index] .cap-formatter-cell')),
        reportNameField: element(by.id('reportName')),
        standardReports: element.all(by.className('scrollable standard-ct')).get(0).all(by.css('label')),
        step2ReportType: element(by.css('.report-type')),
        step3: element(by.css('report-step-three')),
        step3Checkboxes: element.all(by.css('report-step-three .grid-checkbox-item')),
        step3CheckboxesnewGrid: element.all(by.css('report-step-three .grid-checkbox-item')),
        vaultAvailability: element.all(by.cssContainingText('.group-node .not-link>span', 'Vault')).get(0),
        checkBoxEnabled: (index: number): ElementFinder => {
            return element.all(by.css(`[row-index='${index}'] .grid-checkbox-item:not([disabled])`)).last();
        },
        elementByText: (text: string): ElementFinder => {
            return element.all(by.xpath(`//*[contains(text(), "${text}")]`)).first();
        },
        step4: element(by.css('report-step-four')),
        step4Labels: element.all(by.css('report-filters-step .control-label')),
        step4Inputs: element.all(by.css('.report-filters-step input:not(.datepicker-input)' +
            ':not(#radio-yes):not(#radio-no):not(#radio-any):not(#include-aml-parts):not(.ng-valid-date)')),
        viewReportModalFilters: element.all(by.css('.panel-info')).get(2).all(by.css('.col-md-2.col-lg-2')),
        attributesList: element.all(by.css('.attribute-details li')),
        searchForMfrFieldLabel: element(by.css('.mfr-search-ct em')),
        searchForMfrInput: element(by.css('.manufacturer-typeahead-ct input')),
        selectedMfrsFieldLabel: element(by.css('.selected-mfr-ct.show-selected-mfrs label')),
        selectedMfrs: element.all(by.css('.selected-mfr-ct .chosen-choices li span')),
        selectedMfrsXButton: element.all(by.css('.selected-mfr-ct .search-choice-close')),
        includeAllAMlPartsCheckboxLabel: element(by.css('report-step-four .checkbox label')),
        includeAllAMlPartsCheckboxInput: element(by.css('report-step-four .checkbox input')),
        reportNameFirstCellLinks: element.all(by.css('[row-index="0"] .cap-hyperlink-val a')).last(),
        reportNameFirstRowLinks: element.all(by.css('[row-index="0"] .cap-hyperlink-val a')),
        amlWarningMessage: element(by.css('.row.alert-row > div.col-md-9')),
        bomTreeCustomIcon: element.all(by.css('.custom-icon')),
        reportsTooltip: element(by.css('.popover-body img')),
        rowsInBOMHierarchyGrid: element.all(by.css('[id="bomSel"] .ag-row[role="row"]')),
        returnExpandIconByRowNumber: (number: number): ElementFinder => {
            return element(by.css(`[id="bomSel"] .ag-row[role="row"][row-index="${number}"] .icon-container.expand-trigger-icon`))
        },
        returnCheckboxByRowNumber: (number: number): ElementFinder => {
            return element(by.css(`[id="bomSel"] .ag-row[role="row"][row-index="${number}"] input`))
        },
        returnPanelTitleByName: (name: string): ElementFinder => {
            return element(by.cssContainingText('.panel-title', name))
        },
        reportStatusColumnFilterCheckboxByLabel: (label: string): ElementFinder => {
            return element(by.xpath(`//div[contains(text(), "${label}")]/../div/input`))
        },
        reportsImagesByLabelName: (name: string): ElementFinder => {
            return element(by.xpath(`.//label[contains(text(),"${name}")]/ancestor::*[@class="item-ct"]/descendant::img`));
        },
        folderPlusIconSvgByRowNumber: function (rowNumber: number) {
            return element.all(by.css('.icon-container.expand-trigger-icon')).get(rowNumber).element(by.css('[*|href="#ihs-icon-bom-tree-icon-plus"]'))
        },
        expandFolderIconNewGrid: element.all(by.css('.icon-container.expand-trigger-icon')),
        innerRowsIconInExpandFolder: element.all(by.css('.ag-row-selected [*|href*="#ihs-icon-flat-bom-file"]')),
        notVaultBomRows: element.all(by.css('div.group-node:not([style="padding-left: 16px;"]) *[*|href*="#ihs-icon-flat-bom-file"]')),
        reportNameGrid: element.all(by.css('div[row-index="0"] .cap-hyperlink-val a')),
        reportModal: element.all(by.css('.report-details')),
        reportModalTitle: element.all(by.css("div[class='modal-header'] div"))
    },
    customTemplates: {
        templateNameInput: element(by.css('#templatename')),
        templateDescInput: element(by.css('#description')),
        step1FieldLabels: element.all(by.css('.step-one label.pull-right')),
        step1FieldCounters: element.all(by.css('.step-one .form-group>span')),
        step2: element(by.css('custom-template-step-two')),
        step2Button: element(by.css('.button-ct>button')),
        step3Button: element(by.css('.footer-button-ct>button')),
        attributesToggle: element(by.css('.form-control.input-sm')),
        groupList: element.all(by.css('selectable-list')).get(0).all(by.css('.attribute-group')),
        valueList: element.all(by.css('selectable-list')).get(0).all(by.css('.list-group-item')),
        selectedValueList: element.all(by.css('selectable-list')).get(1).all(by.css('.list-group-item')),
        selects: element.all(by.css('.btn.btn-default')),
        step3: element(by.css('custom-template-step-three')),
        waitstep3: element.all(by.css('custo.btn.btn-defaultm-template-step-two .attributes-column')),
        tips: element.all(by.css('.text-justify')),
        orderText: element(by.css('.alert.alert-info>label')),
        tipsText: element(by.css('.shim-top>label')),
        ascItem: element(by.css('.attribute-list-item.selected .arrow-ct-asc')),
        descItem: element(by.css('.attribute-list-item.selected .arrow-ct-desc')),
        unsotr: element.all(by.css('.btn.btn-primary.btn-sm')),
        step3Item: element.all(by.css('.attribute-list-item>.item-name')),
        sectionTitle: element.all(by.className('panel panel-default')),
        step3Tips: element(by.className('alert-info info-ct'))
            .element(by.css('label')),
        step3CheckboxInput: element(by.css('custom-template-step-three .checkbox input')),
        step3CheckboxLabel: element(by.css('custom-template-step-three .checkbox label')),
        step4: element(by.css('report-filters-step')),
        modalSubtitle: element(by.css('.flex-container>div>h4')),
        containers: element.all(by.css('.panel-heading')),
        filterContainerRows: element.all(by.css('.small-column-content li')),
        overviewFields: element.all(by.css('.panel-body strong')),
        modalTemplateLinks: element.all(by.css('.shim-left>a')),
        attributesSortList: element.all(by.css('.flex-1.shim-right .panel-info')).get(1).all(by.css('li')),
        saveAsNewModalNameField: element(by.css('#copyNameId')),
        attributeBoxInsideTemplateModal: element(by.css(".panel-info li[class='ng-star-inserted']")),
        tipSection: element.all(by.css('.dual-list .text-justify')),
        descriptionSummary: element.all(by.css('.flex-1.shim-right .panel-info')).get(0).all(by.css('.panel-body>.ng-star-inserted')),
    }
};

export const loginElements = {
    loginField: element(by.css('[name="subAcctLoginName"]')),
    passwordField: element(by.css('[name="subAcctPassword"]')),
    submitButton: element(by.css('[name="Submit"]')),
    registerUserText: element(by.cssContainingText('font', 'Returning Registered Users:')),
    emailAddressField: element(by.css('[name="userEmail"]')),
    emailPasswordField: element(by.css('[name="userPassword"]')),
    bomIntelligenceLink: element(by.cssContainingText('a', 'BOM Intelligence'))
};

export const gridElements: any = {

    cellByRowAndColumnNumber: (rowNumber: number, columnNumber: number): ElementFinder => {
        return element.all(by.css(`[row-index="${rowNumber}"] [role='gridcell']:not([col-id='CHECKBOXES_COLUMN'])`)).get(columnNumber)
    },

    rowCellsWithoutContent: function (gridNumber: number, rowNumber: number) {
        return element.all(by.className('ui-grid-canvas')).get(gridNumber).all(by.css('.ui-grid-row')).get(rowNumber)
            .all(by.css('.ui-grid-cell:not(.ui-grid-row-header-cell)'))
    },
    rowCellsWithContent: function (gridNumber: number, rowNumber: number) {
        return element.all(by.className('ui-grid-canvas')).get(gridNumber).all(by.css('.ui-grid-row')).get(rowNumber)
            .all(by.css('.ui-grid-cell:not(.ui-grid-row-header-cell) .ui-grid-cell-contents'))
    },

    rowCellsWithContentNewGrid: (rowNumber: number, columnNumber: number): ElementFinder => {
        return element.all(by.css(`[row-index="${rowNumber}"][ class*=focus] .ag-cell-value .cap-string-val`)).get(columnNumber);
    },
    cellsWithContent: function (gridNumber: number) {
        return element.all(by.className('ui-grid-canvas')).get(gridNumber).all(by.css('.ui-grid-row'))
            .all(by.css('.ui-grid-cell:not(.ui-grid-row-header-cell) .ui-grid-cell-contents'))
    },
    rowCellLinksWithContentInSlider: (rowNumber: number) => {
        return element.all(by.css(`.slider-panel.open .active [row-index="${rowNumber}"] .cap-formatter-cell a`))
    },
    cellWithText: function (text: string) {
        return element(by.cssContainingText('.cap-tooltip-val', text))
    },
    columnHeaders: function (number: number) {
        return element.all(by.className('ui-grid-header-canvas')).get(number)
            .all(by.css('.ui-grid-cell-contents span:not(.gridicon)'))
    },
    sortingHeader: function (headerName: string) {
        return element(by.cssContainingText('.ui-grid-header .ui-grid-header-cell', headerName))
    },
    sortingBoxXbutton: element.all(by.css('.ihsGridHeaderBox button')).get(0),
    sortingBoxGoButton: element.all(by.css('.ihsGridHeaderBox button')).get(1),
    sortingBoxSearchField: element(by.css('.ihsGridHeaderBox input')),
    sortingBoxSearchOptions: element.all(by.css('.ihsGridHeaderBox select option')),
    ignoredCell: element.all(by.css('.ui-grid-cell.ignored')),
    gridMfrNameCell: element.all(by.css("div[col-id='P2065198075'] div[class*='cap-formatter-cell']")),
    ignoredOneCell: function (ignoredCellName: string) {
        return element(by.cssContainingText('.cap-formatter-cell span', ignoredCellName))
    },
    cellLockedWithContent: element.all(by.className('ui-grid-canvas')).get(0).all(by.css('.ui-grid-row'))
        .all(by.css('.ui-grid-cell:not(.ui-grid-row-header-cell) .ui-grid-cell-contents')),
    cellLocked: element.all(by.className('.ui-grid-canvas')).get(0).all(by.css('.ui-grid-row'))
        .all(by.css('.ui-grid-cell-contents')),
    gridWrapper: element.all(by.css('.ui-grid-canvas,.ag-body,.ag-body-viewport')).first(),
    grid: element(by.css('.ui-grid, .ag-body, [role="grid"]')),
    gridSpinner: element(by.css('.loading-spinner')),
    severalGrid: element.all(by.css('.ui-grid,.ag-body, .ag-body-viewport')),
    columnHeaderArrowDown: element.all(by.css('.grid-header-icon-arrow')),
    filterThisColumnByInput: element(by.css('.ihsGridHeaderBox input')),
    openBox: element(by.css('.ihsGridHeaderBox')),
    sortGoButton: element(by.buttonText('Go')),
    gridLinks: element.all(by.css('.cap-formatter-cell a')),
    gridUnlockLinks: element.all(by.css('.ui-grid-canvas')).get(1).all(by.css('.ui-grid-cell-contents a')),
    gridRows: element.all(by.css('.ui-grid-canvas')).first().all(by.css('.ui-grid-row')),
    yellowGridRows: element.all(by.css('div[col-id="P3901640803"][class*=\'ag-cell\'][style*=\'background-color: #FEFFA1\']')),
    normalGridRows: element.all(by.css('div[col-id="P3901640803"][class*=\'ag-cell\']:not([style*=\'background-color: #FEFFA1;\'])')),
    gridUnlockFirstRowsCells: element.all(by.css('.ui-grid-canvas')).get(1).all(by.css('.ui-grid-row')).first()
        .all(by.css('.ui-grid-cell')),
    noResultsFound: element(by.cssContainingText('span', 'No Rows To Show')),
    bomTreePartsWait: element.all(by.className('simple-tree')).first(),
    bomTreeBaseHeader: element(by.css('.ui-grid-tree-base-header')),
    checkboxSelector: element.all(by.css('[class*="ag"]:not([title="Select All"])>[class*="grid-checkbox-item"] .grid-checkbox-item,.ihs-checkbox-item .grid-checkbox-item')),
    newGridCheckboxSelector: element.all(by.css('[row-index] .grid-checkbox-item')),
    newGridDisabledCheckboxSelector: element.all(by.css('div[class="ag-pinned-left-cols-container"] input[class="grid-checkbox-item"]:disabled')),
    newGridCheckboxWrapper: element.all(by.css('.grid-checkbox-item-wrapper')),
    newGridCheckboxSelectorFolderByRow: (row: number): ElementFinder => {
        return element.all(by.css('[row-index]')).get(row).element(by.css('.grid-checkbox-item'));
    },
    newGridCheckboxSelectorByIndex: (index: number): ElementFinder => {
        return element(by.css(`[row-index="${index}"] .grid-checkbox-item`))
    },
    newGridCheckboxSelectorInSliderByIndex: (index: number): ElementFinder => {
        return element(by.css(`.slider-panel.open [row-index="${index}"] .grid-checkbox-item`))
    },
    newGridModalCheckboxSelectorByIndex: (index: number): ElementFinder => {
        return element(by.css(`.modal-body [row-index="${index}"] .grid-checkbox-item`))
    },
    newGridSliderCheckboxSelectorByIndex: (index: number): ElementFinder => {
        return element(by.css(`.slider-panel.open [row-index="${index}"] .grid-checkbox-item`))
    },
    newGridWaitLink: element.all(by.css('.cap-formatter-cell')),
    selectAllCheckbox: element(by.css('.ag-header-cell .grid-checkbox-item, [ng-model="grid.selection.selectAll"] .grid-checkbox-item')),
    selectAllCheckboxes: element.all(by.css('.ag-header-cell .grid-checkbox-item, [ng-model="grid.selection.selectAll"] .grid-checkbox-item')),
    shadeCheckboxSelector: element.all(by.css('.open .grid-checkbox-item')),
    nextPageButton: element(by.css('.ui-grid-pager-next, .next-triangle')),
    nextPageButtonInModal: element(by.css('.slider-component-ct .next-triangle')),
    sliderGridNewtNotDisabledButton: element(by.css('.slider-component-ct .pagination-controls button:nth-child(5):not([disabled])')),
    treeFolderNames: element.all(by.css('.node-title.not-link')),
    previousPageButton: element(by.css('.ui-grid-pager-previous, .prev-triangle')),
    header: element.all(by.css('.ihsBasicHeader')),
    headerNewGridInModal: element.all(by.css('.modal-body .ag-header-cell')),
    headerName: element.all(by.className('ui-grid-header-canvas')).all(by.css('.ihsBasicHeader'))
        .all(by.css('.ui-grid-cell-contents .header-title')),
    headerTitle: element.all(by.css('.ui-grid-header-canvas .ihsBasicHeader')),
    newGridReturnHeaderTitleElementByName: (name: string): ElementFinder => {
        return element(by.xpath(`//span[text()="${name}"]/ancestor::div[@class="ag-header-cell ag-focus-managed"]`))
    },
    //new grid elements
    selectedCheckbox: element.all(by.css('.ag-row-selected .grid-checkbox-item')),
    newGridLeftPort: element(by.css('.ag-pinned-left-cols-container')),
    newGridHeaderCells: element.all(by.css('.ag-header-cell')),
    newGridHeaderNames: element.all(by.css('.ag-header-cell-text')),
    dropDownItemNames: element.all(by.css('.open .pl-select-item>a')),
    newGridHeaderNamesWait: element.all(by.css('.ag-header-cell-label .ag-header-cell-text')),
    newGridHeaderNamesbomTreeParts: element.all(by.css('.tree-grid-wrapper .ag-header-cell-text')),
    newGridHeaderNamesInModal: element.all(by.css('.modal-body .ag-header-cell-text')),
    newGridHeaderNamesInSlider: element.all(by.css('.slider-panel .ag-header-cell-text')),
    newGridHeadersInSlider: element.all(by.css('.slider-panel .ag-header-cell')),
    newGridHeaderCss: '.ag-header-cell',
    newGridUnlockHeaderCss: '.ag-header-viewport .ag-header-cell',
    newGridUnlockHeaderCssSlider: '.slider-panel .ag-header-viewport .ag-header-cell',
    newGridHeaderGroupCss: '.ag-header-group-cell',
    newGridModalUnlockedHeaderNames: element.all(by.css('.modal-body .ag-header-viewport .ag-header-cell-text')),
    newGridMfrCategories: element.all(by.css('.modal-body mfr-categories .ag-header-viewport .ag-header-cell-text')),
    newGridColumnHeaderNamesLockUnlock: (lockUnlock: number): ElementArrayFinder => {
        return element.all(by.css('.ag-header-row')).get(lockUnlock).all(by.css('.ag-header-cell-text'))
    },
    newGridLockedColumnHeaders: element.all(by.css('.ag-pinned-left-header .ag-header-cell-text')),

    newGridColumnHeadersGroup: element.all(by.css('.ag-header-group-text')),
    newGridUnlockedColumnHeaders: element.all(by.css('.ag-header-viewport .ag-header-cell-text')),
    newGridCellByColumnId: (columnId: string) => {
        return element.all(by.css(`[col-id="${columnId}"] .cap-formatter-cell`))
    },
    newGridLockedCellByRowIndexAndColumnId: (index: number, columnId: string): ElementFinder => {
        return element(by.css(`.ag-pinned-left-cols-container [row-index="${index}"]`)).element(by.css(`[col-id="${columnId}"] .cap-formatter-cell`));
    },
    newGridUnlockedCellByRowIndexAndColumnId: (index: number, columnId: string): ElementFinder => {
        return element.all(by.css(`.ag-center-cols-viewport .ag-center-cols-container [row-index="${index}"]`)).last().element(by.css(`[col-id="${columnId}"] .cap-formatter-cell`));
    },
    newGridLockedCellByRowIndexAndColumnIdForBomTreeParts: (index: number, columnId: string): ElementFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${index}"]`))
            .get(1).element(by.css(`[col-id="${columnId}"] .cap-formatter-cell`));
    },
    newGridUnlockedCellByRowIndexAndColumnIdForBomTreeParts: (index: number, columnId: string): ElementFinder => {
        return element.all(by.css(`.ag-center-cols-viewport .ag-center-cols-container [row-index="${index}"]`))
            .get(1).element(by.css(`[col-id="${columnId}"] .cap-formatter-cell`));
    },

    lockedHeadersForId: element.all(by.css('.ag-pinned-left-header .ag-header-cell-text[role="columnheader"]')),
    unlockedHeadersForId: element.all(by.css('.ag-header-viewport .ag-header-cell')),
    newGridCellValueById: (id: string): ElementArrayFinder => {
        return element.all(by.css(`[col-id="${id}"] .cap-formatter-cell`))
    },
    newGridCellLinksById: (id: string): ElementArrayFinder => {
        return element.all(by.css(`[col-id="${id}"] .cap-formatter-cell a`))
    },
    newGridReturnColumnNameByColumnId: (id: string): ElementFinder => {
        return element(by.css(`.ag-header-cell-sortable[col-id="${id}"]`))
    },
    newGridModalColumnHeaderNamesLockUnlock: (lockUnlock: number): ElementArrayFinder => {
        return element.all(by.css('.modal-body .ag-header-row')).get(lockUnlock).all(by.css('.ag-header-cell-text'))
    },
    newGridSliderColumnHeaderNamesLockUnlock: (lockUnlock: number): ElementArrayFinder => {
        return element.all(by.css('.slider-panel.open .ag-header-row')).get(lockUnlock).all(by.css('.ag-header-cell-text'))
    },
    newGridModalLockColumnLinks: element.all(by.css('.modal-body .ag-cell-last-left-pinned .cap-formatter-cell:not(.rel-info) a')),
    newGridHeaderByName: (cellName: string): ElementFinder => {
        return element(by.cssContainingText('.ag-header-cell-text', cellName))
    },
    newGridAllHeadersByName: (cellName: string): ElementArrayFinder => {
        return element.all(by.cssContainingText('.ag-header-cell-text', cellName))
    },
    newGridHeaderByNameInModal: (cellName: string): ElementFinder => {
        return element(by.cssContainingText('.modal-body .ag-header-cell-text', cellName))
    },
    newGridCloseHeaderSort: element.all(by.className('ag-tab ag-tab-selected')),
    newGridOpenHeaderSortButton: element.all(by.css('.ag-header-cell-menu-button')),
    newGridOpenSortBox: element(by.css('.ag-tabs-body')),
    newGridOpenSortBoxOptionByName: (optionName: string): ElementFinder => {
        return element(by.cssContainingText('.ag-menu-option-text', optionName))
    },
    newGridOpenSortBoxFilterOptionByName: (optionName: string): ElementFinder => {
        return element(by.cssContainingText('.ag-set-filter-item-checkbox', optionName))
    },
    newGridCellByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`[row-index="${index}"] .ag-cell .cap-formatter-cell`))
    },
    newGridCellLinkByRowIndexAndCellNumber: (index: number, cellNumber): ElementFinder => {
        return element.all(by.css(`[row-index="${index}"] .ag-cell .cap-formatter-cell`)).get(cellNumber).element(by.css('a'))
    },
    newGridCellWithoutContentByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`[row-index="${index}"] .ag-cell`))
    },
    newGridLockedCellWithoutContentByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${index}"] .ag-cell`))
    },
    newGridLockedCellWithContentByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${index}"] .ag-cell .cap-formatter-cell`))
    },
    newGridUnlockedCellWithoutContentByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-center-cols-viewport [row-index="${index}"] .ag-cell`))
    },
    newGridUnlockedCellWithContentByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-center-cols-viewport [row-index="${index}"] .ag-cell .cap-formatter-cell`))
    },
    newGridUnlockLinkByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`[row-index="${index}"] .ag-cell a`))
    },
    newGridLinksByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${index}"] .cap-formatter-cell a`))
    },
    newGridLockLinkByRowIndex: (index: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${index}"] .ag-cell a`))
    },
    newGridColumnFilterOptionByName: (optionName: string): ElementFinder => {
        return element(by.cssContainingText('.ag-menu-option-text', optionName))
    },
    newGridColumnFilterOptions: element.all(by.css('.ag-menu-option-text')),
    newGridOpenFilterOptions: element.all(by.css('.dropdown-options .pl-select-item')),
    newGridOpenSortBoxFilterOptions: element.all(by.css('.ag-filter-body-wrapper .ag-icon-checkbox-checked')),
    newGridOpenSortBoxSearchField: element(by.css('.ag-text-field-input-wrapper input')),
    newGridRows: element.all(by.css('.ag-center-cols-container [row-index], .ui-grid-row')),
    newGridRowsBomTreeParts: element.all(by.css('.tree-grid-wrapper-ct.flex-1 .ag-center-cols-container [row-index], .ui-grid-row')),
    newGridBodies: element.all(by.css('.ag-body-viewport')),
    newGridRowsInSlider: element.all(by.css('.slider-panel.open .ag-pinned-left-cols-container [row-index]')),
    newGridRowsInModal: element.all(by.css('.modal-body .ag-center-cols-container [row-index], .ui-grid-row')),
    newGridLockedColumnRowCellsWithContent: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    newGridLockedColumnLinksByRowAndCellNumbers: (rowNumber: number, cellNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`))
            .get(cellNumber).all(by.css('a'))
    },
    newGridModalLockedColumnRowCellsWithContent: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.modal-body .ag-pinned-left-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    newGridModalUnlockedColumnRowCellsWithContent: function (rowNumber: number) {
        return element.all(by.css(`.modal-body .ag-center-cols-viewport [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    newGridSliderLockedColumnRowCellsWithContent: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.slider-panel.open .ag-pinned-left-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    newGridSliderUnlockedColumnRowCellsWithContent: function (rowNumber: number) {
        return element.all(by.css(`.slider-panel.open .ag-center-cols-viewport [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    newGridUnlockedColumnRowCellsWithContent: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-center-cols-container [row-index="${rowNumber}"] .ag-cell-value`))
    },
    newGridUnlockedColumnLinksByRowAndCellNumbers: (rowNumber: number, cellNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-center-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`))
            .get(cellNumber).all(by.css('a'))
    },
    newGridLockedColumnCellsWithContent: element.all(by.css('.ag-pinned-left-cols-container [row-index] .cap-formatter-cell')),
    newGridUnlockedColumnCellsWithContent: element.all(by.css('.ag-center-cols-clipper [row-index] .cap-formatter-cell')),
    newGridLockedColumnCellsWithImgByCellNumber: (index: number): ElementFinder => {
        return element.all(by.css('.ag-pinned-left-cols-container [row-index] .cap-formatter-cell')).get(index).element(by.css('img'))
    },
    newGridUnlockedColumnCellsWithImgByCellNumber: (index: number): ElementFinder => {
        return element.all(by.css('.ag-body-viewport-wrapper [row-index] .cap-formatter-cell')).get(index).element(by.css('img'))
    },
    newGridModalLockedColumnCellsWithContent: element.all(by.css('.modal-body .ag-body-viewport [row-index] .ag-cell-value:not([col-id="CHECKBOXES_COLUMN"])')),
    newGridModalUnlockedColumnCellsWithContent: element.all(by.css('.modal-body .ag-body-viewport-wrapper [row-index] .cap-formatter-cell')),
    newGridSliderLockedColumnCellsWithContent: element.all(by.css('.slider-panel.open .ag-pinned-left-cols-viewport-wrapper [row-index] .cap-formatter-cell')),
    newGridSliderUnlockedColumnCellsWithContent: element.all(by.css('.slider-panel.open .ag-center-cols-viewport [row-index] .cap-formatter-cell')),
    newGridSortHeaderIcon: element(by.css('.ag-header-icon.ag-filter-icon:not(.ag-hidden)')),
    newGridFilterHeaderIconByName: (num: number): ElementFinder => {
        return element.all(by.css('.ag-cell-label-container')).get(num).element(by.css('.ag-header-icon.ag-filter-icon:not(.ag-hidden)'))
    },
    newGridAcsSortingHeaderIconByName: (num: number): ElementFinder => {
        return element.all(by.css('.ag-cell-label-container')).get(num).element(by.css('.ag-sort-ascending-icon:not(.ag-hidden)'))
    },
    newGridDescSortingHeaderIconByName: (num: number): ElementFinder => {
        return element.all(by.css('.ag-cell-label-container')).get(num).element(by.css('.ag-sort-descending-icon:not(.ag-hidden)'))
    },
    ascSortHeaderIconByName: function (name: string) {
        return element(by.xpath(`//span[text()="${name}"]/following-sibling::span[contains(@class,"ag-sort-ascending-icon")]`));
    },
    descSortHeaderIconByName: function (name: string) {
        return element(by.xpath(`//span[text()="${name}"]/following-sibling::span[contains(@class,"ag-sort-descending-icon")]`));
    },
    filterHeaderIconByName: function (name: string) {
        return element(by.xpath(`//span[text()="${name}"]/following-sibling::span[contains(@class,"ag-filter-icon")]`));
    },
    descSortingHeaderIcon: element(by.css('.ag-header-icon.ag-sort-descending-icon')),
    ascSortingHeaderIcon: element(by.css('.ag-header-icon.ag-sort-ascending-icon')),
    newGridSimpleTextCell: element.all(by.css('.cap-string-val')),
    newGridNoRowsToShowText: element.all(by.css('.ag-overlay-no-rows-center')),
    newGridModalLockedColumnHeaders: element.all(by.css('.modal-body .ag-pinned-left-header .ag-header-cell-text')),
    newGridModalUnlockedColumnHeaders: element.all(by.css('.modal-body .ag-header-viewport .ag-header-cell-text')),
    newGridInModalLockedColumnCellsWithContent: element.all(by.css('.modal-body .ag-pinned-left-cols-container [row-index] ' +
        '.cap-formatter-cell')),
    newGridInModalUnlockedColumnCellsWithContent: element.all(by.css('.modal-body .ag-center-cols-clipper [row-index] ' +
        '.cap-formatter-cell')),
    newGridInSliderLockedColumnHeaders: element.all(by.css('.slider-panel.open .ag-pinned-left-header .ag-header-cell-text')),
    newGridInSliderUnlockedColumnHeaders: element.all(by.css('.slider-panel.open .ag-header-viewport .ag-header-cell-text')),
    columnsSort: {
        dropdown: element(by.css('.ag-filter .bootstrap-sm')),
        newGridDropdownInput: element(by.css('.ag-filter .bootstrap-sm input')),
        dropdownInput: element(by.css('.ag-menu .bootstrap-select input')),
        activeDropdownOptionByText: (name: string): ElementFinder => {
            return element(by.cssContainingText('q-mod-part-number-filter .pl-select-item.active a', name))
        },
        datePicker: element(by.css('.svg-icon-calendar')),
        dateBox: element(by.css('.ngb-dp-months')),
        activeDropdownOption: element(by.css('q-mod-part-number-filter .pl-select-item.active a')),
        input: element(by.css('.ag-menu #filterText')),
        inputWithCheckboxes: element(by.css('.ag-text-field-input')),
        keywordInput: element(by.css('.keyword-filter .ag-filter-filter')),
        ignoreSpecCharInput: element(by.css('q-mod-part-number-filter #ignoreSpecialChars')),
        ignoreSpecCharLabel: element(by.css('q-mod-part-number-filter .checkbox-row label')),
        checkboxInputs: element.all(by.css('.ag-filter-body-wrapper .ag-checkbox>div:nth-child(2)')),
        checkboxLabels: element.all(by.css('.ag-set-filter-item-checkbox .ag-checkbox-label')),
        validationError: element(by.css('.has-error.error')),
        returnMenuOptionsByName: (name: string): ElementFinder => {
            return element(by.xpath(`//span[contains(text(), "Sort Ascending")]/ancestor::div[contains(@class, "ag-menu-option")]`))
        },
        readchCompiliant: {
            yesRadioButtonInput: element(by.css("[id*='radio-buttons-Yes']")),
            noRadioButtonInput: element(by.css("[id*='radio-buttons-No']")),
            yesRadioButtonLabel: element(by.cssContainingText('.shim-left-mini', 'Yes')),
            noRadioButtonLabel: element(by.cssContainingText('.shim-left-mini', 'No')),
        },
        descroptionRadioButtonInputs: element.all(by.css('.ag-filter-body.keyword-filter .radio-input-container input')),
        descroptionRadioButtonLabels: element.all(by.css('.ag-filter-body.keyword-filter .radio-input-container label')),
        mfrTypeAhead: element(by.css('.manufacturer-typeahead-ct input')),
        mfrTypeAheadModal: element(by.css('.flex-container.flex-dir-row input')),
        mfrTypeAheadOptions: element.all(by.css('.manufacturer-typeahead-ct .look-head-list .look-head-list-item.ng-star-inserted')),
        mfrTypeAheadOptionsActive: element.all(by.css('div[class=\'manufacturer-typeahead-ct\'] li[class*=\'active\']')),
        selectedTags: element.all(by.css('.search-choice span')),
        xButtonSelectedTags: element.all(by.css('.search-choice button')),
        dateInput: element(by.css('.ag-filter-date-from input')),
        simpleCloseButton: element(by.css('.ag-tabs-header .ag-tab .ag-header-cell-icon-wrapper-menu')),
        closeButton: element(by.css('.ag-tabs-header .ag-tab .ag-header-cell-icon-wrapper-filter')),
        activeFilterIcon: element(by.css('.ag-tab-selected .ag-header-cell-icon-img-filter')),
        activeSortIcon: element(by.css('.ag-tab-selected .ag-header-cell-icon-wrapper-menu')),
        mainHeaderText: element(by.css('chosen-choices .svg-host-button')),
        dateRangedropdownButton: element(by.css('icon-click.dropdown-toggle ')),
        dateRangedropdownList: element.all(by.css('ul.pl-select.dropdown-menu.primary.down>li')),
    },

    headerNameInSlider: element.all(by.css('.slider-panel.open .ui-grid-header-canvas')).all(by.css('.ihsBasicHeader'))
        .all(by.css('.ui-grid-cell-contents .header-title')),
    sortingBox: element(by.css('.ihsGridHeaderBox')),
    upArrow: element(by.css('.arrowUp')),
    resetColumn: element(by.cssContainingText('.col-xs-10', 'Reset this Column')),
    hideColumn: element(by.cssContainingText('.col-xs-10', 'Hide this Column')),
    sortAZ: element(by.cssContainingText('.col-xs-10', 'Sort A to Z')),
    sortZA: element(by.cssContainingText('.col-xs-10', 'Sort Z to A')),
    sortSmallToLargeLink: element(by.cssContainingText('.btn-link', 'Sort Oldest to Newest')),
    sortOldToNewLink: element(by.cssContainingText('.btn-link', 'Sort Smallest to Largest')),
    sortZaLink: element(by.cssContainingText('.btn-link', 'Sort Z to A')),
    sortLargeToSmallLink: element(by.cssContainingText('.btn-link', 'Sort Largest to Smallest')),
    sortNewToOldLink: element(by.cssContainingText('.btn-link', 'Sort Newest to Oldest')),
    paginationPanel: element(by.css('.ui-grid-pager-panel, ihs-ng-cap-grid-pagination .pagination-controls, .pagination-controls')),
    paginationPanelInSlider: element(by.css('.pagination-controls, .slider-panel.open .pagination-controls')),
    paginationItemPerPageValuesInSlider: element.all(by.css('.ui-grid-pager-row-count-picker option, .slider-panel .page-size-selector option')),
    itemPerPage: element(by.css('.ui-grid-pager-row-count-picker select, .page-size-selector')),
    itemPerPageOptionByName: (name: string): ElementFinder => {
        return element(by.cssContainingText('option.ng-star-inserted', name))
    },
    itemPerPageValues: element.all(by.css('.ui-grid-pager-row-count-picker, .page-size-selector')).last().all(by.css('option')),
    lastPage: element(by.css('.ui-grid-pager-last')),
    firstPage: element(by.css('.first-bar')),
    itemsCountInGrid: element(by.css('.ui-grid-pager-count span:not([title="through"]),.pagination-info')),
    maxPagesPerGrid: element(by.css('.ui-grid-pager-max-pages-number, .page-amount-info')),
    gridCounter: element(by.css('.ui-grid-pager-count, .pagination-info')),
    gridCounters: element.all(by.css('.ui-grid-pager-count, .pagination-info')),
    currentPage: element(by.css('.page-input')),
    firrstcellWithoutContentLocked: element.all(by.className('ui-grid-canvas')).get(0).all(by.css('.ui-grid-row'))
        .all(by.css('.ui-grid-cell')),
    cellLockedLinkInCell: function (cellNumber: number) {
        return element.all(by.className('ui-grid-canvas')).get(0).all(by.css('.ui-grid-row'))
            .all(by.css('.ui-grid-cell-contents')).get(cellNumber).element(by.css('a'))
    },
    cellUnlocked: element.all(by.className('ui-grid-canvas')).get(1).all(by.css('.ui-grid-row'))
        .all(by.css('.ui-grid-cell')),
    cellUnlockedFirstLinks: element.all(by.className('ui-grid-canvas')).get(1).all(by.css('.ui-grid-row'))
        .all(by.css('.ui-grid-cell-contents a')),
    cellLockedFirstLinks: element.all(by.className('ui-grid-canvas')).get(0).all(by.css('.ui-grid-row'))
        .all(by.css('.ui-grid-cell-contents a')),
    linkCellUnlocked: element.all(by.className('ui-grid-canvas')).get(1).all(by.css('.ui-grid-row'))
        .all(by.css('.ui-grid-cell-contents a')),
    columnHeaderNames: element.all(by.css('.header-title.text-elipsis')),
    columnHeaderNamesLockUnlock: element.all(by.css('.ag-cell-label-container')),
    rowCells: element.all(by.css('.ui-grid-canvas .ui-grid-row')).first().all(by.css('.ui-grid-cell-contents')),
    rows: element.all(by.css('.ui-grid-canvas .ui-grid-row')),
    firstRowLink: element.all(by.css('.ui-grid-canvas .ui-grid-row, .ag-pinned-left-cols-container'))
        .first().all(by.css('.ui-grid-cell-contents a, .cap-formatter-cell a')).first(),
    bomRowAllLinks: element.all(by.css('.ui-grid-canvas .ui-grid-row, .ag-pinned-left-cols-container'))
        .first().all(by.css('.ui-grid-cell-contents a, .cap-formatter-cell a')),
    cells: element.all(by.css('.ui-grid-canvas .ui-grid-cell-contents')),
    currentPaginationValue: element.all(by.css('.ui-grid-pager-row-count-picker>select [selected="selected"], .page-size-selector')),
    lockedColumnHeaders: element.all(by.className('ui-grid-header-canvas'))
        .get(0).all(by.css('.header-title.text-elipsis')),
    firstHeaderCells: element.all(by.css('.ui-grid-header')).get(0).all(by.css('.ui-grid-cell-contents')),
    newGridHeaderWithTitleByName: (cellName: string): ElementFinder => {
        return element(by.cssContainingText('.ag-header-row .ag-header-cell', cellName))
    },
    columnHeaderNamesCPL: element.all(by.css('.cpl-grid-table.ng-star-inserted .ag-cell-label-container')),

};

export const newsElements = {
    newsModal: element(by.css('.news-modal')),
    tabHeaders: element.all(by.css('.tab-pane.active h2')),
    videoLinks: element.all(by.css('.tab-pane.active .ng-star-inserted a')),
};

export const modalElements = {
    modalButtonByName: (buttonName: string): ElementFinder => {
        return element(by.css('.modal-body')).element(by.buttonText(buttonName))
    },
    modalTitleByName: (name: string): ElementFinder => {
        return element(by.cssContainingText('.modal-title', name))
    },
    modalClickElement: (index: number): ElementFinder => {
        return element.all(by.css('.single-item-wrapper .ng-star-inserted')).get(index);
    },
    modalTitle: element(by.css('.modal-title>div')),
    text: element(by.css('.modal-body .col-md-12, .modal-body')),
    newGirdModalLockedHeaderColumns: element.all(by.css('.modal-body .ag-pinned-left-header .ag-header-cell')),
    newGirdModalUnlockedHeaderColumns: element.all(by.css('.modal-body .ag-header-viewport .ag-header-cell')),
    modalReportsFile: element(by.css('.tpl-iframe')),
    reportModalText: element(by.css('.form-group .col-sm-12')),
    modalBodyParagNew: element.all(by.css('.modal-body p')),
    additionaInfoLink: element.all(by.css('.ag-center-cols-container a')).first(),
    additionaInfoLinks: element.all(by.css('.ag-center-cols-container a')),
    modalBodyP: element.all(by.css('.modal-body>p')),
    selectedPartsTooltip: element.all(by.css('.radio div')).first(),
    hoverOverSelectedParts: element(by.css('.radio>div')),
    modalTables: (index: number, cellNumber: number): ElementFinder => {
        return element.all(by.css('.info-bar.ng-star-inserted > table > tbody')).get(index).all(by.css('tr td')).get(cellNumber);
    }
};

export const comparePartsElements: any = {
    columnLabel: element.all(by.css('.modal-body#compare-parts-modal .ag-header-cell .grid-checkbox-item-wrapper .ag-header-cell-text')),
    columnCheckboxInput: element.all(by.css('.modal-body#compare-parts-modal .ag-header-cell .grid-checkbox-item-wrapper input')),
    subtitle: element(by.css('.container-fluid .row')),
};

export const searchElements = {
    searchIn: element(by.css('[class="search-in-controls shim-bottom-mini"] h2')),
    searchTab: element.all(by.css('.sub-menu-items-block')).get(-1).all(by.css('a')),
    mfrSearchLeftNavIcon: element(by.css('[href="#/search/manufacturer"] .search-menu-icon')),
    searchField: element(by.css('#search-text')),
    parametricSearchField: element(by.css('.category-search-container .form-control')),
    whereUsedSearchField: element.all(by.css('.col-md-8 .form-control')),
    whereUsedSearchMatchedManufacturerNameField: element.all(by.css('.flex .form-control')),
    activeSearchTab: element(by.css('.search-menu-item.active a')),
    cplSearchField: element(by.css('.flex-cell>input')),
    saveModalFiledLabels: element.all(by.css('.modal-body .col-md-2')),
    saveModalStatmentForInputs: element.all(by.css('.modal-body .shim-bottom-sm')),
    saveSearchNameField: element(by.css('[name="searchName"]')),
    saveSearchDescriptionField: element(by.css('.form-control.padding-sm')),
    recallSearchesDropdown: element(by.css('.save-search-container .form-control.input-sm, .form-control.input-sm')),
    recallSearchesDropdownOptions: element.all(by.css('.input-group-btn >ul >li >a')),
    comparePartsSubtitle: element(by.css('.modal-body#compare-parts-modal .row')),
    comparePartsColumnHeaders: element.all(by.css('.modal-body#compare-parts-modal .ag-header-cell .ag-header-cell-text')),
    comparePartsAttributesLabel: element(by.css('.modal-body#compare-parts-modal .ag-pinned-left-header .ag-header-label')),
    searchExpandItem: element.all(by.css('.search-menu-item>div')),
    subMenuItems: element.all(by.css('.sub-menu-item a')),
    viewSearchCriteriaContent: element.all(by.css('.popover-content div i, .popover-body div i')),
    accordioRow: element(by.css('.ihs-accordion .panel-heading')),
    mfrNameField: element(by.css('#addManuFieldId')),
    saveSearchSharedCheckboxLabel: element.all(by.css('.modal-body .checkbox label')),
    saveSearchSharedCheckboxInput: element.all(by.css('.modal-body .checkbox input')),
    recentSearchExpandIcon: element.all(by.css('.search-menu-item > div')),
    mfrPrefIcon: element.all(by.css('.pref-mfr')),
    addPartsToBom: {
        panelTitle: element.all(by.css('.modal-body .panel-title')),
        panelH4: element.all(by.css('.modal-body h4')),
        workspaceCheckboxes: element.all(by.css('workspace-boms [role="gridcell"] .grid-checkbox-item-wrapper input')),
        bomsCheckboxes: element.all(by.css('.modal-body bom-select input')),
        checkboxes: element.all(by.css('.ui-grid-canvas')).get(0).all(by.css('.ui-grid-cell-contents .grid-checkbox-item')),
        gridWrapper: element.all(by.css('.ui-grid-canvas,.ag-body,.ag-body-viewport')),
        chekboxes: element.all(by.css('.modal-body .panel-body .grid-checkbox-item')),
        workspaceOpenCheck: element.all(by.css('.panel-default')).get(0).all(by.css('div[class=\'panel-collapse collapse flex-container\']')).get(0),
        BOMTreeOpenCheck: element.all(by.css('.panel-default')).get(1).all(by.css('div[class=\'panel-collapse collapse flex-container\']')).get(0),
        bomsCheckboxesDisabled: element.all(by.css('.grid-checkbox-item-input-wrapper>[disabled]')),
        addToMyBOM: element.all(by.css('.add-to-my-bom>label')).first(),
    },
    manageLayout: {
        subtitle: element(by.css('.layouts-panel>p')),
        lockedColumnText: element(by.css('.text-justify')),
        lockedColumns: element.all(by.css('.list-group-item.mandatory')),
        unlockedColumns: element.all(by.css('.list-group-item:not(.mandatory)')),
        moveUpButton: element(by.css('button[title="Move Up"]')),
        moveDownButton: element(by.css('button[title="Move Down"]')),
        lockButton: element.all(by.css('.height-100')).get(1)
            .all(by.css('.btn.btn-default')).get(2),
        groupTitle: element.all(by.css('.group-title')),
        dropdownOptionsByName: function (name: string) {
            return element(by.cssContainingText('.open .pl-select-item', name))
        },
        shareCheckboxLabel: element.all(by.css('[for="share-checkbox"]')),
        shareCheckboxInput: element.all(by.css('#share-checkbox')),
        infoIcon: element.all(by.css('.info-icon')),
    },
    mfr: {
        sliderGreyBarOptions: element.all(by.css('.header-column')),
        transferInformationHeader: element(by.css('transfers-information h1')),
        transferInformationText: element(by.css('transfers-information p')),
        transferInformationLink: element(by.css('transfers-information a')),
    },
    parametric: {

        commodities: element.all(by.css('.commodity-name')),
        partTypes: element.all(by.className('flex-container list-group-wrapper')).get(1).all(by.className('list-group-item-content')),
        categories: element.all(by.className('flex-container list-group-wrapper')).get(2).all(by.className('list-group-item-content')),
        byValue: element(by.className('text-center ng-star-inserted')),
        byValueLabel: element(by.css('.text-center label')), //.text-center.ng-star-inserted label
        byValueInput: element(by.css('.text-center input')), //.text-center.ng-star-inserted input
        byValueDiv: element.all(by.css('.text-center div')), //.text-center.ng-star-inserted div
        attribute: element.all(by.className('flex-container list-group-wrapper')).get(0).all(by.className('list-group-item-content')),
        value: element.all(by.className('flex-container list-group-wrapper')).get(1).all(by.className('list-group-item-content')),
        addedFilter: element.all(by.className('flex-container list-group-wrapper')).get(2).all(by.className('no-select display-filter ng-star-inserted')),
        paramtricEntryLabel: element(by.css('.flex-0>label')),
        boxesLabels: element.all(by.css('.col-md-3>h2')),
        boxesLabels2: element.all(by.css('.col-md-4>h2')),
    },
    haystack: {
        partNumberOrNsnField: element.all(by.css('.flex-row>input')).get(0),
        partNumberOrNsnX: element.all(by.css('.panel-body button.svg-host-button:not(.dropdown-toggle)')).get(0),
        vendorNameField: element(by.css('type-ahead>input')),
        vendorX: element.all(by.css('.panel-body button.svg-host-button:not(.dropdown-toggle)')).get(1),
        partNumberRadioButtonInput: element(by.css('#filterRadio-partNumber')),
        partNumberRadioButtonLabel: element.all(by.css('.radio>label')).get(0),
        nsnRadioButtonInput: element(by.css('#filterRadio-nsn')),
        nsnRadioButtonLabel: element.all(by.css('.radio>label')).get(1),
        vendorFieldLabel: element(by.css('.panel-body .shim-bottom-sm:not(.flex-row)')),
        firstNsnLink: element.all(by.css('.ui-grid-canvas .ui-grid-row')).first()
            .all(by.css('.ui-grid-cell-contents a')).first(),
        firstItemNameCell: element.all(by.css('.ui-grid-canvas .ui-grid-row')).first()
            .all(by.css('.ui-grid-cell-contents')).get(2),
        sliderNsnValue: element.all(by.css('.header-column:not(strong)')).get(0),
        sliderNameValue: element.all(by.css('.header-column:not(strong)')).get(1),
        sliderAttributes: element.all(by.css('.open .ui-grid-cell:nth-child(odd)')),
        sliderValues: element.all(by.css('.open .ui-grid-cell:nth-child(even)')),
        printHeader: element(by.css('.info>h1:not(span)')),
        printSubHeader: element(by.css('.info>h1>span')),
        leftNavItems: element.all(by.css('.list-wrapper>.menu-item:not(.disabled)')),
        printModalLabels: element.all(by.css('.title>label')),
        printLogo: element(by.css('.modal-body .header-bar img')),
        printSegmentAAttributes: element.all(by.css('.modal-body tbody')).get(1)
            .all(by.css('tr>th')),
        printSegmentAValues: element.all(by.css('.modal-body tbody')).get(1)
            .all(by.css('tr>td')),
        definitionCode: element.all(by.css('.definition .ng-star-inserted')),
        definitionDescription: element.all(by.css('.definition-description')),
        sliderAttributeLinks: element.all(by.css('.open a.pointer.header-title.text-ellipsis')),
        sliderValueLinks: element.all(by.css('.open a.pointer:not(.text-ellipsis)')),
        sliderHeader: element.all(by.css('.open .ihsBasicHeader')),
        sliderRowCount: element.all(by.css('.open .ui-grid-row')).first().all(by.css('.ui-grid-cell-contents')),
        sliderCells: element.all(by.css('.open haystack-part-details-grid .ui-grid-canvas .ui-grid-cell-contents')),
        associatedCageCode: element(by.cssContainingText('.ui-grid-cell-contents', 'Associated CAGE Code')),
        xButton: element(by.css('.close-shade .svg-host-button')),
    },
    documents: {
        docSearchFieldLabels: element.all(by.css('.documents-search-form-ct>div>label')),
        docSearchCheckboxInput: element.all(by.css('.match-types-ct .checkbox input')),
        docSearchCheckboxLabel: element.all(by.css('.match-types-ct .checkbox label')),
        // docTypeLabel: element(by.cssContainingText('.match-types-ct>h5', 'Document Types:')),
        docTypeLabel: element(by.css('.match-types-ct>h5')),                                                            //*******************
        manNameLabel: element(by.css('.filter-section>div>label')),                                                            //*******************
    },

    whereUsed: {
        labels: element.all(by.css('.control-label')),
        helpMessage: element.all(by.css('.help-message')),
        filterIcon: element.all(by.css('.filter-icon-wrapper')),
        filterField: element.all(by.css('.shim-top .col-md-8'))
            .all(by.css('input')),
        dropdown: element.all(by.css('.col-md-12 .bootstrap-select')),
        dropdownOption: element.all(by.css('.col-md-12 .bootstrap-select .pl-select-item')),
    },
    parts: {
        partNymberRadioButtonTypeByName: (name: string): ElementFinder => {
            return element(by.cssContainingText('.radio .bold', name))
        },
        partsSearchForm: element(by.css('part-search-form')),
        partsSearchFieldsLabels: element.all(by.css('.part-search-form-ct .flex-row>label,' +
            ' .panel-body.part-search-form-ct>div>label')),
        partsSearchFiltersLabels: element.all(by.css('.filter-section>label')),
        partsSearchRadioButtonsLabels: element.all(by.css('.shim-right.radio'))
            .all(by.css('label')),
        partsSearchRadioButtonsInputs: element.all(by.css('.shim-right.radio'))
            .all(by.css('input')),
        keywordRadioButton: element.all(by.css('.keyword-well .radio label')),
        keywordRadioButtonInput: element.all(by.css('.keyword-well .radio input')),
        keywordMatchRadioButton: element.all(by.css('.keyword-well>div .radio label')),
        keywordMatchRadioButtonInput: element.all(by.css('.keyword-well>div .radio input')),
        infoSection: element.all(by.className('info-section')),
        ignoreSpecCharLabel: element.all(by.css('.ignore-ct label')),
        ignoreSpecCherInput: element.all(by.id('ignoreSpecialChar')),
        partStausCheckboxes: element.all(by.css('.status-checkbox-row label')),
        partStausCheckboxesInput: element.all(by.css('.status-checkbox-row input')),
        envRadionButtonsLabels: element.all(by.css('.environment-comp-ct .radio-inline label')),
        envRadionButtonsInput: element.all(by.css('.environment-comp-ct input')),
        cplCheckboxLabel: element(by.css('.filter-section .checkbox label.no-margin')),
        cplCheckboxInput: element(by.css('#cplId')),
        filterSearchButton: element(by.css('.common-filters-footer')).element(by.buttonText('Search')),
        filterShade: {
            sectionLabels: element.all(by.css('common-filters-shade .filter-section>label,' +
                'common-filters-shade .filter-section .shim-bottom-sm>label.no-margin')),
            partStatusCheckboxLabels: element.all(by.css('.common-filters-main .filter-section')).get(0)
                .all(by.css('.checkbox>label')),
            partStatusCheckboxInputs: element.all(by.css('.common-filters-main .filter-section')).get(0)
                .all(by.css('.checkbox>input')),
            reachCompiliantRadioButtonLabels: element.all(by.css('.common-filters-main .filter-section')).get(2)
                .all(by.css('.radio>label')),
            reachCompiliantRadioButtonInputs: element.all(by.css('.common-filters-main .filter-section')).get(2)
                .all(by.css('.radio>input')),
            euRochsRadioButtonLabels: element.all(by.css('.common-filters-main .filter-section')).get(3)
                .all(by.css('.radio>label')),
            euRochsRadioButtonInputs: element.all(by.css('.common-filters-main .filter-section')).get(3)
                .all(by.css('.radio>input')),
            chinaRochsRadioButtonLabels: element.all(by.css('.common-filters-main .filter-section')).get(4)
                .all(by.css('.radio>label')),
            chinaRochsRadioButtonInputs: element.all(by.css('.common-filters-main .filter-section')).get(4)
                .all(by.css('.radio>input')),
            qualificationsCheckboxLabels: element.all(by.css('.common-filters-main .filter-section')).get(5)
                .all(by.css('.checkbox>label')),
            qualificationsCheckboxInputs: element.all(by.css('.common-filters-main .filter-section')).get(5)
                .all(by.css('.checkbox>input')),
            temperatureGradeCheckboxLabels: element.all(by.css('.common-filters-main .filter-section')).get(6)
                .all(by.css('.checkbox>label')),
            temperatureGradeCheckboxInputs: element.all(by.css('.common-filters-main .filter-section')).get(6)
                .all(by.css('.checkbox>input')),
        }
    }
};

export const bomElements: any = {
    activeBomInLeftNav: element(by.css('.sub-menu-item')),
    vaultSummary: {
        vaultTable: element.all(by.css('.summary-table-body')),
    },
    bomVault: {
        userList: element.all(by.css('.userlist-bullet label')),
        modifyOwnerShadeColumnHeaders: element.all(by.css('tr th')),
        modifyOwnerShadeRows: element.all(by.css('tr td')),
        userRadioButtonLabels: element.all(by.css('.userlist label')),
        userRadioButtonInputs: element.all(by.css('.userlist input')),
    },

    attributes: {
        attributesWait: element(by.css('.bom-attributes')),
        xButton: element.all(by.css('.input-field-svg svg-symbol')),
        leftSideSections: element(by.className('import-attr-section'))
            .all(by.css('h3')),
        rightSideSections: element(by.className('import-config-section'))
            .all(by.css('h3')),
        rightSideSectionLabels: element(by.className('import-config-section'))
            .all(by.css('label')),
        rightSideSectionLabelsAttributes: element.all(by.css('[class="import-config-section"] div[class="ng-star-inserted"]')),
        flagOptionByName: (name: string): ElementFinder => {
            return element(by.xpath(`//div[contains(text(), "${name}")]/preceding-sibling::div/span`))
        },
        bomNameField: element(by.css('.bom-name-wrap input')),
        descField: element.all(by.css('.control-panel-well')).get(0).element(by.css('textarea')),
        desc: element(by.className('import-attr-section'))
            .all(by.className('control-panel-well')).get(0).all(by.className('flex-row'))
            .get(3).element(by.css('.shim-left>span')),
        emailInput: element.all(by.css('.email-field input')),
        xInput: element.all(by.css('.email-field span.input-field-svg')),
        contactField: element(by.css('[placeholder="Contact Name"]')),
        contactLabel: element.all(by.className('control-panel-well')).get(1).all(by.className('flex-row')).get(13)
            .element(by.css('span')),
        phoneField: element(by.css('[placeholder="(---) --- ----"]')),
        ipnField: element(by.css('[placeholder="Internal Part Number"]')),
        assemblyField: element(by.css('[placeholder="Assembly"]')),
        quantityField: element(by.css('[placeholder="Quantity"]')),
        counter: element.all(by.css('.text-right.shim-top-mini')),
        sentValue: function (sent: string) {
            return element(by.cssContainingText('.flex-row', sent))
        },
        mainHeaderText: element.all(by.css('.flex-baseline .input-field-svg')),
        indicator: function (option: number) {
            return element.all(by.className('import-config-section'))
                .all(by.className('flex-row shim-bottom')).get(1)
                .all(by.className('flex-1 shim-left flex-baseline'))
                .all(by.className('flex-row flex-center')).get(option).element(by.css('.checkbox-flag'))
                .element(by.css('.checked-item')).element(by.css('[ewbsvguse="ihs-icon-checkmark"]'))
        },
        emailAlertTypeCheckboxes: function (option: number) {
            return element.all(by.className('import-config-section'))
                .all(by.className('flex-row shim-bottom')).get(1)
                .all(by.className('flex-1 shim-left flex-baseline'))
                .all(by.className('flex-row flex-center')).get(option).element(by.css('.checkbox-flag'))
        },
        matchingOptionCheckboxes: function (option: number) {
            return element.all(by.className('import-config-section'))
                .all(by.className('flex-row shim-bottom')).get(2)
                .all(by.className('flex-1 shim-left flex-baseline'))
                .all(by.className('flex-row flex-center')).get(option).element(by.css('.checkbox-flag'))
        },
        cplMatchingOptionCheckboxInput: element.all(by.className('import-config-section'))
            .all(by.className('flex-row shim-bottom')).get(3)
            .all(by.className('flex-1 shim-left flex-baseline'))
            .all(by.className('flex-row flex-center')).all(by.css('.checkbox-flag>input')),
        cplMatchingOptionCheckboxLabel: element.all(by.className('import-config-section'))
            .all(by.className('flex-row shim-bottom')).get(3)
            .all(by.className('flex-1 shim-left flex-baseline'))
            .all(by.className('flex-row flex-center')).all(by.css('.checkbox-flag'))
    },
    dashboard: {
        bomSummary: element(by.css('#bomDashboard')),
        sectionFields: element.all(by.css('.col-md-5.col-lg-4.text-right')),
        partsSummaryLinks: element.all(by.css('.panel-info .panel-body')).get(0).all(by.css('.row a')),
        partsAlertsLinks: element.all(by.css('.panel-info .panel-body')).get(4).all(by.css('.row a.part-alerts-link')),
        lifeCycleSection: element(by.css('dashboard-lifecycle')),
        environmentalSection: element(by.css('dashboard-environmental')),
        mfrPrefSection: element(by.css('dashboard-mfr-preferences-summary')),
        matchingSection: element(by.css('dashboard-matching')),
        notFoundLabel: element(by.cssContainingText('.nv-series', 'Not found')),
    },
    partAlerts: {
        alertStatusCells: element.all(by.css('.ui-grid-cell.ui-grid-coluiGrid-05LR')),
        setAlertStatusDropdown: element(by.css('.set-alert-status-container')),
    },
    ocmsSlider: {
        fieldLabels: element.all(by.css('.flex-row strong')),
        fieldInputs: element.all(by.css('.form-container  input')),
        inputByLabelName: (name: string): ElementFinder => {
            return element(by.xpath(`//strong[contains(text(),"${name}")]/
            ancestor::*[contains(@class,"col-md-2")]/following-sibling::*[contains(@class,"input-container")]/descendant::input`))
        },
        fieldTextArea: element.all(by.css('.form-container  textarea')),
        fieldCounter: element.all(by.css('.form-container .col-md-3')),
        sliderArrow: element.all(by.css('.slider-tab [svg-symbol="ihs-icon-arrow"]')),
        enableFields: element.all(by.css('.form-container  input:not([readonly="readonly"]):not( [disabled="disabled"])')),
        sliderGridRequirAdd: element.all(by.css('.icon-edit.required-add')),
        sliderGridInputs: element.all(by.css('.ag-text-area-input')),
    },

    partNotes: {
        commentFiled: element(by.css('part-note-add-comment textarea')),
        copyModalParagraph: element.all(by.css('part-note-copy p')),
        emailModalParagraph: element.all(by.css('part-email-note p')),
        statusLabels: element.all(by.css('.flex-row label')),
        defaultStatus: element(by.css('.notes-white')),
        procurableStatus: element(by.css('.notes-green')),
        resolutionStatus: element(by.css('.notes-ltblue')),
        resolvedStatus: element(by.css('.notes-dblue')),
        unknownStatus: element(by.css('.notes-gray')),
        unprocurableStatus: element(by.css('.notes-red')),
        unprocurableAltStatus: element(by.css('.notes-yellow')),
        allActiveStatuses: element(by.css('.notes-white, .notes-green, .notes-ltblue, .notes-dblue, .notes-gray, .notes-red, .notes-yellow')),
        settingsSection: element.all(by.className('settings-ct')),
        charactersCounter: element(by.css('part-note-add-comment > span')),
        calendarIcon: element.all(by.css('.svg-icon-calendar')),
        dataPickerInputField: element.all(by.css('datepicker input')),
        procurabilityDropdownInput: element.all(by.css('.form-control.input-sm')),
    },

    customLayout: {
        shadeTitle: element(by.css('.shim-bottom-mini>h1, h1.shim-bottom-mini')),
        shadeInfoIcon: element(by.css('.shim-bottom-mini button')),
        shadeInfoIconTooltip: element(by.css('div.popover-body')),
        subtitle: element(by.css('.layouts-panel>p')),
        columnLabels: element.all(by.css('.attributes-column .col-md-12')),
        defaultOptions: element.all(by.className('list-group-item mandatory')),
        availableAttributesContainer: element.all(by.css('ul.list-group.no-text-select')).get(0),
        availableAttributes: element.all(by.css('ul.scrollable-list.no-text-select')).get(0)
            .all(by.css('.list-group-item')),
        attributeByName: (name: string): ElementFinder => {
            return element(by.cssContainingText('.list-group-item', name))
        },
        selectedAttributes: element.all(by.css('ul.scrollable-list.no-text-select')).get(1)
            .all(by.css('.list-group-item')),
        addSelectedButton: element.all(by.css('.list-arrows.button-container>button')).get(0),
        addAllButton: element.all(by.css('.list-arrows.button-container>button')).get(1),
        removeSelectedButton: element.all(by.css('.list-arrows.button-container>button')).get(2),
        removeAllButton: element.all(by.css('.list-arrows.button-container>button')).get(3),
        newCustomLayoutField: element(by.css('.in .quick-search-text')),
    },
    amlModal: {
        subtitle: element(by.css('.modal-body .shim-bottom>strong')),
        modalContainer: element(by.css('.add-aml-part-panel')),
        attributes: element.all(by.css('.modal-body .ag-pinned-left-cols-container .ag-cell .cap-formatter-cell')),
        headerCells: element.all(by.css('.modal-body .ag-header-cell-text')),
        amlSearchForAPartCheckboxes: (num: number): ElementFinder => {
            return element(by.css(`.add-aml-part-panel [row-index="${num}"] .grid-checkbox-item`))
        },
        lcRiskHeader: element(by.cssContainingText('.ag-header-cell-text', 'LC Risk')),
        amlRiskHeader: element(by.cssContainingText('.ag-header-cell-text', 'AML Risk')),
        prefColumns: element.all(by.css('.modal-body .ag-center-cols-container .ag-cell .cap-formatter-cell'))
    },

    addAPartShade: {
        shadeResetButton: element(by.css('.btn.btn-deemphasized')),
        shadeSearchField: element(by.css('.in .input-ct>input')),
        searchForAPartCheckbox: (num: number): ElementFinder => {
            return element(by.css(`search-for-part [row-index="${num}"] .grid-checkbox-item`))
        },
        fieldLabels: element.all(by.css('.label-container label')),
        fieldInputs: element.all(by.css('dom-custom-node input')),
        workspaceCheckbox: (num: number): ElementFinder => {
            return element(by.css(`select-part [row-index="${num}"] .grid-checkbox-item`))
        },
        searchInput: element(by.css('.search-for-part-left .input-ct input')),
        searchInputXButton: element(by.css('.search-for-part-left .input-ct .clear-input-btn'))
    }
};

export const settings = {
    module: element(by.css('.settings-module')),
    savedSearches: element.all(by.cssContainingText('.text-elipsis', 'Saved Searches')).first(),
    sectionLabels: element.all(by.css('p.bold')),
    settingsList: element.all(by.css('.icon-area')).get(2).element(by.css('.dropdown-menu')).all(by.css('ul.menu-links>li')),
    searchSettings: {
        moduleLabel: element.all(by.css('.settings-ct .bold:not(.shim-top-sm):not(.shim-top)')),
        sectionHeader: element.all(by.css('.section-header')),
        keywordDropdownToggle: element.all(by.css('.dropdown-toggle')).get(0),
        searchTypeDropdownToggle: element.all(by.css('.dropdown-toggle')).get(1),
        layoutDropdownToggle: element.all(by.css('.dropdown-toggle')).get(2),
        CPLlayoutDropdownToggle: element.all(by.css('.dropdown-toggle')).get(3),
        activeLayout: element(by.css('.open .pl-select-item.active:not([ng-transclude="customLinkSlot"]) a')),
        searchQualificationCheckboxLabels: element.all(by.css('.settings-ct')).first().all(by.css('.indent')).get(1)
            .all(by.css('.checkbox label')),
        searchQualificationCheckboxInputs: element.all(by.css('.settings-ct')).first().all(by.css('.indent')).get(1)
            .all(by.css('.checkbox input')),
        paginationRadioButtonLabels: element.all(by.css('.settings-ct')).get(1)
            .all(by.css('.indent:not(.shim-top):not(.shim-bottom-sm) .radio label')),
        paginationRadioButtonInputs: element.all(by.css('.settings-ct')).get(1)
            .all(by.css('.indent:not(.shim-top):not(.shim-bottom-sm) .radio input')),
        cplCheckboxInput: element(by.css('#cpl-results-cb')),
        cplCheckboxLabel: element(by.css('.shim-top.indent.checkbox label')),
        cplSearchResultsCheckbox: element.all(by.css('input[id*="cpl-"]')),
        cplcustomLink: element(by.css('.cpl-grid-table.ng-star-inserted a')),
        alternateTypeCheckboxInputs: element.all(by.css('.settings-ct .checkboxes-row')).get(0).all(by.css('input')),   //++++++++
        alternateTypeCheckboxLabels: element.all(by.css('.settings-ct .checkboxes-row')).get(0).all(by.css('label')),   //++++++++
        alternatesQualificationCheckboxInputs: element.all(by.css('.settings-ct .checkboxes-row')).get(1).all(by.css('input')),   //++++++++
        alternatesQualificationCheckboxLabels: element.all(by.css('.settings-ct .checkboxes-row')).get(1).all(by.css('label')),   //++++++++
        ignoreCheckboxLabel: element.all(by.css('.settings-ct')).get(0)
            .all(by.css('.indent')).get(0).all(by.css('.checkbox label')),
        ignoreCheckboxInput: element.all(by.css('.settings-ct')).get(0)
            .all(by.css('.indent')).get(0).all(by.css('.checkbox input')),
        distributorCheckboxLabels: element.all('.indent').get(8).all(by.css('label')),
        distributorCheckboxInputs: element.all('.indent').get(8).all(by.css('input')),
        searchByObjectID: element.all('#check-search-by-objectID').get(0),
        dropdownText: element.all(by.css('.droplist-title'))
    },
    alertSettings: {
        sectionTitles: element.all(by.css('p.bold')),
        alertSettingOptionsTitles: element.all(by.css('.indent p')),
        alertTypesCheckboxLabels: element.all(by.css('.indent .checkbox label')),
        alertTypesCheckboxInputs: element.all(by.css('.indent .checkbox input')),
        messageFormatRadioButtonLabels: element.all(by.css('.indent.flex-row.shim-bottom')).get(0).all(by.css('.radio label')),
        fileAttachRadioButtonLabels: element.all(by.css('.indent.flex-row.shim-bottom')).get(1).all(by.css('.radio label')),
        fileAttachMessageTypeRadioButtonLabels: element.all(by.css('.indent.flex-row.shim-bottom'))
            .get(2).all(by.css('.radio label')),
        emailOrganizationButtonLabels: element.all(by.css('.indent.flex-row.shim-bottom')).get(3).all(by.css('.radio label')),


    },
    generalSettings: {
        generalSettingsLabels: element.all(by.css('p.section-header')),
        instructionPanelOptions: element.all(by.css('.indent>.radio')),
        instrPanelRadioButtonLabels: element.all(by.css('.indent')).get(0).all(by.css('.radio label')),
        instrPanelRadioButtonInputs: element.all(by.css('.indent')).get(0).all(by.css('.radio input')),
        matchConfirmRadioButtonLabels: element.all(by.css('.indent')).get(1).all(by.css('.radio label')),
        matchConfirmRadioButtonInputs: element.all(by.css('.indent')).get(1).all(by.css('.radio input')),
    },
    bomVaultSettings: {
        paginationRadioButtonLabels: element.all(by.css('.settings-ct')).first().all(by.css('.radio label')),
        paginationRadioButtonInputs: element.all(by.css('.settings-ct')).first().all(by.css('.radio input')),
        lockedColumnnRadioButtonLabels: element.all(by.css('.settings-ct')).get(0).all(by.css('.radio label')),
        lockedColumnnRadioButtonInputs: element.all(by.css('.settings-ct')).get(0).all(by.css('.radio input')),

        layoutDropdownToggle: element.all(by.css('.dropdown-toggle')).get(0),
        sectionTitles: element.all(by.css('p.bold')),
        optionLabels: element.all(by.css('.shift-left p')),
        ExpectedDefaultText: element.all(by.css('div.checkbox label')),
        ExpectedDefaultinput: element.all(by.css('div.checkbox input')),
        folderAnchorBomTree: element.all(by.css('.ag-row-level-2 .node-title span')),

    },
    bomImportSettings: {
        kbOptionsRadioButtonLabels: element.all(by.css('.settings-ct')).first().all(by.css('.radio label')),
        kbOptionsRadioButtonInputs: element.all(by.css('.settings-ct')).first().all(by.css('.radio input')),
        defaultCheckboxLabels: element.all(by.css('.settings-ct')).first().all(by.css('.checkbox label')),
        defaultCheckboxInputs: element.all(by.css('.settings-ct')).first().all(by.css('.checkbox input')),
        cplCheckboxLabels: element.all(by.css('.settings-ct')).get(1).all(by.css('.checkbox label')),
        cplCheckboxInputs: element.all(by.css('.settings-ct')).get(1).all(by.css('.checkbox input')),
        aboutBomImportLabels: element.all(by.css('.settings-ct')).get(3).all(by.css('.checkbox label')),
        aboutBomImportInputs: element.all(by.css('.settings-ct')).get(3).all(by.css('.checkbox input')),
        savedConfigs: element(by.cssContainingText('.text-elipsis', 'Saved Configurations')),
        savedConfOptions: element.all(by.css('.panel-heading')),
        savedConfigLinks: element.all(by.css('.cap-formatter-cell a')),
        pathField: element(by.css('.ellipsis-input-wrapper>input')),
    },
    distributors: {
        distributorContainer: element(by.css('.home-content')),
        distributorHeading: element.all(by.css("h2[class='shim-bottom']")).get(0),
        saveButton: element.all(by.css('.shim-bottom .btn-default')).get(0),
    }
};

export const resReqElements = {
    fieldTitlesList: element.all(by.css('.modal-body .text-right')),
    firstStepInputs: element.all(by.css('.control-panel')).get(0).all(by.css('input')),
    fileUploadInput: element(by.css('[name="file-name"]')),
    reqInfoField: element(by.css('.modal-body textarea')),
    idLink: element.all(by.className('ui-grid-canvas')).get(0)
        .all(by.css('.ui-grid-row')).first()
        .all(by.css('.ui-grid-cell-contents a')).first(),
    viewResReqSubtitle: element.all(by.css('.modal-body .shim-bottom')).get(0),
    viewResResTopBarTitles: element.all(by.css('.modal-body .info-label>label')),
    leftNavItems: element.all(by.css('.modal-body .list-group-item')),
    leftNavLinks: element.all(by.css('.modal-body .list-group-item a')),
    textAreaComment: element.all(by.css('add-research-request-comment textarea, escalate-research-request textarea')),
    textAreaCounter: element.all(by.css('add-research-request-comment .character-count em, escalate-research-request .character-count em')),
    viewResReqModalFileInput: element(by.css('.file-input-ct input:not(#email-notify)')),
    uploadInput: element(by.css('#uploadComment')),
    mfrPartNumberField: element(by.css('[name="mfr-part-number"]')),
    mfrNameField: element(by.css('[name="mfr-name"]')),
    cell: element.all(by.css('.modal .cap-string-val')),
    mfrPartNumberAndNamefieldInput: element.all(by.css('submit-research-request-grid td'))
};

export const commonElements = {
    popoverContent: element.all(by.css('.popover-body, .popover-content')),
    popoverContentLi: element.all(by.css('.popover-body li, .popover-content li')),
    popoverTitle: element(by.css('.popover-body h2, .popover-content h2')),
    popoverBoldTitle: element(by.css('.popover-body .bold')),

    popoverStrong: element.all(by.css('.popover-body strong, .popover-content strong')),
    popoverI: element.all(by.css('.popover-body i, .popover-content i')),
    popoverDiv: element.all(by.css('.popover-body div, .popover-content div')),
    popoverDivB: element.all(by.css('.popover-body div b, .popover-content div b')),
    popoverX: element(by.css('.popover-body .pointer, .popover-content .pointer')),
    popoverContentParagP: element.all(by.css('.popover-body p, .popover-content p')),
    popoverInput: element(by.css('.popover-body .form-control')),
    popoverCounter: element(by.css('.popover-body .char-count')),
    popoverB: element.all(by.css('.popover-body b')),
    popoverContentSort: element.all(by.css('.popover-body >div >div')),
    popoverMultiBomReportTitle: element(by.css('.popover.bom-reports-list')),
    keywordViewSearchCriteria: function (value: string) {
        return element(by.cssContainingText('.popover-body>div', value))
    },
    activeLeftNav: element(by.css('.left-menu-item.active')),
    activeSubMenuInLeftNav: element(by.css('.sub-menu-item.active')),
    activeSearchLeftNav: element(by.css('.search-menu-item.active')),
    okButton: element(by.css('#ok')),
    accordionElements: element.all(by.css('.panel-title')),
    accordionElementsOnResultPage: element.all(by.css('.panel-title .col-md-3')),
    lookAhead: element.all(by.css('.look-head-list-item')),
    leftNav: element.all(by.css('.left-menu-item>label')),
    leftNavOptionByName: (name: string): ElementFinder => {
        return element(by.cssContainingText('.left-menu-item>label', name))
    },
    commonTypeAheadInputsXbutton: element.all(by.css('.input-icon >button')),
    commonTypeAheadInput: element(by.css('type-ahead>input')),
    commonTypeAheadInputs: element.all(by.css('type-ahead>input')),
    tabCount: element.all(by.css('.badge')),
    badgePartExceptions: element(by.css('li:nth-child(5) .badge')),
    badgeManufacturerExceptions: element(by.css('li:nth-child(4) .badge')),
    entryTextBox: element(by.css('category-search .form-control.short')),
    radioButtonLabel: element.all(by.css('.radio label')),
    radioButtonInput: element.all(by.css('.radio input')),
    checkboxLabel: element.all(by.css('.checkbox label')),
    checkboxInput: element.all(by.css('.checkbox input')),
    paginationRadioButtonInputs: element.all(by.css('.settings-ct')).get(1)
        .all(by.css('.indent:not(.shim-top):not(.shim-bottom-sm) .radio input')),
    navTabs: element.all(by.css('.nav-tabs-2>li a')),
    modalNavTabs: element.all(by.css('.modal-body .nav-tabs-2>li a')),
    shadeNavTabs: element.all(by.css('.panel-component-ct.in .nav-tabs-2>li a')),
    activeNavTab: function (tabName: string) {
        return element(by.cssContainingText('.active>a', tabName))
    },
    dropdownItemByName: function (name: string) {
        return element(by.cssContainingText('.open .pl-select-item>a', name))
    },
    itemName: function (name: string) {
        return element(by.cssContainingText('.list-group-item', name))
    },
    labelByName: function (name: string) {
        return element(by.cssContainingText('label', name))
    },
    divByName: function (name: string) {
        return element(by.cssContainingText('div', name))
    },
    queryViewSearchCriteria: element.all(by.css('.popover-body')).get(0).all(by.css('i')).get(0),
};

export const partDetailsElements = {
    mfr: element.all(by.css('.IHS-Color-G11-Add')).get(1),
    alertsIcon: element.all(by.className('alert-gray')),
    cplIcon: element.all(by.css('.rel-info .cpl')),
    cell: element.all(by.css('.modal-body .cap-formatter-cell')),
    cellLinks: element.all(by.css('.modal-body .ag-cell a')),
    distribIcon: element.all(by.className('distributors')),
    distribIconByRowNumber: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`)).get(0).all(by.css('.distributors'))
    },
    docIcon: element.all(by.className('documents-view')),

    lifeCycleIcon: element.all(by.css('.life-cycle')),
    lifeCycleIconBlack: element.all(by.css('.life-cycle-active')),
    lifeCycleIconDisc: element.all(by.css('.life-cycle-red')),
    lifeCycleIconEOL: element.all(by.css('.life-cycle-yellow')),
    lifeCycleIconReActivated: element.all(by.css('.life-cycle-ltblue')),
    eurohsIconGray: element.all(by.css('.enviromental-gray')),
    eurohsIconGreen: element.all(by.css('.enviromental-lt')),

    cellValueDisplayed: element.all(by.css("[row-index='0'] div div")).get(0),
    gridAttributes: element.all(by.css(".modal-body [role='row'] [role='gridcell']:nth-child(1)")),
    gridValues: element.all(by.css(".modal-body [role='row'] [role='gridcell']:nth-child(2)")),
    nsnIcon: element.all(by.className('nsn')),
    enviromentalIcon: element.all(by.className('enviromental')),
    partDetailsLinks: function (linkName: string) {
        return element(by.xpath(`//span[contains(text(),"${linkName}")]/parent::a`));
    },
    pdfIcon: element.all(by.css('.datasheet')),
    referDesignIcon: element.all(by.className('refdesign')),
    viewAltIcon: element.all(by.className('alternates')),
    viewAltIconINBOM: function (rowid: number) {
        return element(by.css(`.ag-row[row-id='${rowid}'] .alternates`));
    },
    rowsByAltIcon: element.all(by.xpath('//a[@class = "alternates"]//ancestor::div[contains(@class, "ag-row-position-absolute")]')),
    viewAlternatesFilterToolbarButton: element(by.cssContainingText('.cb-btn', 'Filter')),
    openViewAltDropdown: element(by.css('.cb-details')),
    filterCheckboxLabel: element.all(by.css('.cb-details label')),
    filterCheckboxInput: element.all(by.css('.cb-details .checkbox')),
    sectionLeftNavItems: element.all(by.css('.list-group-item:not(.disabled) .custom-icon')),
    notDisabledLeftNavItems: element.all(by.css('.list-group-item:not(.disabled)')),
    // notDisabledLeftNavItems: element.all(by.css('.list-group-item:not(.disabled) [menu-item="menuItem"]')),
    exportDropdwonOptions: element.all(by.css('.open input:not([value="Export All"])')),
    noResultsFound: element(by.css('.alternates-grid'))
        .element(by.xpath("//*[text()='No results found.']")),
    partDetailsIPN: element.all(by.css('.IHS-Color-G11-Add')).get(0),
    titleWithIpn: element.all(by.css('.modal-header .shim-right')).get(0),
    headerElement: element.all(by.css('.modal-header .shim-right')),
    ipn: element(by.css('#part-number')),
    printPreviewSectionTitle: element.all(by.css('.title>label')),
    printPreviewBody: element.all(by.css('tbody')),
    printPreviewBodySegmentCharacteristics: (name: string): ElementArrayFinder => {
        return element.all(by.cssContainingText('.ng-star-inserted tbody .ng-star-inserted >th', name))
    },
    dropdownItems: element.all(by.css('.open .toolbar-list-item>input')),
    columnHeadersElem: element.all(by.css('.modal-body .ag-cell-label-container .ag-header-cell-icon-wrapper-menu')),
    activeLeftNav: element(by.css('.active--no-sub, .active--sub a span')),
    attributesLabels: element.all(by.css('.modal-body .ui-grid-canvas .ui-grid-cell:nth-child(odd)')),
    disableTextLink: (name: string): ElementFinder => {
        return element(by.cssContainingText('.list-group-item.active li.disabled', name))
    },
    disableLink: element(by.css('.list-group-item li.disabled')),
    firstDistributorsInfoColumn: element.all(by.css('div.shim-bottom-mini')).get(0).all(by.css('div')),
    secondDistributorsInfoColumn: element.all(by.css('div.shim-bottom-mini')).get(1).all(by.css('div')),
    substringSecondDistributorsInfoColumn: element.all(by.css('div.shim-bottom-mini')).get(1).element(by.css('div span')),
    thirdDistributorsInfoColumn: element.all(by.css('div.shim-bottom-mini')).get(2).all(by.css('div')),
    authorizedDistributorsRows: element.all(by.css('.ui-grid-viewport .ui-grid-row')),
    authorizedDistributorsHighlightedRows: element.all(by.css('.ui-grid-viewport .ui-grid-row .highlighted')),
    allAttributeColumnName: element.all(by.css('.transpose-attribute-cell .cap-string-val')),
    transposeButton: element(by.css('.transpose-button')),
    authorizedDistributorsRow: (gridNumber: number) => {
        return element.all(by.css('.modal-body ag-grid-angular .ag-row'))
            .all(by.css('.ui-grid-cell:not(.ui-grid-row-header-cell) .ui-grid-cell-contents'))
    },
    printModalLabels: element.all(by.css('.modal-body .title label')),
    printPreviewTables: element.all(by.css('.modal-body .table-container')),
    distributorsPanel: element(by.css(".info-panels .ag-center-cols-container>div")),
    ESDValueElement: element.all(by.css('div[class=\'ag-center-cols-viewport\'] span a')).get(0),
    elementsWithText: (name: string): ElementFinder => {
        return element(by.cssContainingText('.modal-body a span', name))
    },
    ESDPopOver: element.all(by.css('.esd-popover-body')).get(0),
    popOverRows: element.all(by.css('.esd-popover-body .popover-row div')),
    popOverRowsinfo: element.all(by.css('.esd-popover-body .popover-row')).last(),
    pricingAndAvailabilityTrends:element.all(by.css('div[class*=\'charts-panel\']')).first(),
    allAttributesCells: element.all(by.css('.modal-body .ag-center-cols-container [row-index] .transpose-attribute-cell')),
    cellAttributevalues: (cellnumber: number) => {
        return element.all(by.css(`.modal-body .ag-center-cols-container [row-index = '${cellnumber}'] .transpose-attribute-cell`));
    },
    cellValues: (cellnumber: number) => {
        return element.all(by.css(`.modal-body .ag-center-cols-container [row-index = '${cellnumber}'] .ag-cell`)).last();
    }

};

export const toolbarElements = {
    tagByName: (name: string): ElementFinder => {
        return element(by.cssContainingText('.panel-title', name))
    },
    tag: element.all(by.css('[class="toolbar-info-list"] > .panel-title')),
    modalXTag: element.all(by.css('.modal-body [ewbsvguse="ihs-icon-x"]')),
    filterInfo: element.all(by.css('.filter-info')),
    transposeButton: element(by.css('.transpose-button')),
    hideLeftMenuButton: element(by.css('left-menu .menu-open .left-menu-tab')),
    unHideLeftMenuButton: element(by.css('left-menu .menu-collapsed .left-menu-tab')),
    customFilterDropdownLabels: element.all(by.css('.cb-details label')),
    customFilterDropdownInputs: element.all(by.css('.cb-details input')),
    customFilterDropdownTooltips: element.all(by.css('.cb-details label[title]')),
    customFilterBadge: element.all(by.css('.toolbar-info-list[title]')),
    customFilterBadgeXbutton: element(by.css('.panel-title ~ icon-click')),

};

export const quickSearchElements = {
    searchField: element(by.css('.simple-search-content .simple-search-text')),
    typeLabel: element(by.css('.search-settings-expand-lbl')),
    searchButton: element(by.css('.btn-icon')),
    quickSearchDropdown: element.all(by.css('.search-settings-expand-btn')),
    quickSearchX: element(by.css('.simple-search-content [ewbsvguse="ihs-icon-x"]')),
    simpleSearchContainer: element(by.css('.search-settings-container')),
    simpleSearchRadioButtonLabels: element.all(by.css('.search-type label')),
    simpleSearchRadioButtonInputs: element.all(by.css('.search-type input')),
    keywordMathTypeLabels: element.all(by.css('.params-container .radio-container label')),
    keywordMathTypeInputs: element.all(by.css('.params-container .radio-container input')),
    ignoreSpecCharLabel: element(by.css('.checkbox-container label')),
    ignoreSpecCharInput: element(by.css('.checkbox-container input')),
    info: element(by.css('.search-settings .search-info')),
    loading: element(by.css('.ag-loading-text')),
};

export const workspaceElements = {
    removeModalText: element(by.css('.modal-body h4')),
    removeModalItems: element.all(by.css('.modal-body li')),
    pencilIcon: element.all(by.css('.cell-popover-icon')).get(0),
    commentCell: element.all(by.css('.ui-grid-canvas')).get(1).all(by.css('.ui-grid-row')).first()
        .all(by.css('.ui-grid-cell-contents')).get(0).element(by.css('.grid-edit-cell')),
    newGridCommentCell: element.all(by.css('.bom-cell-edit-renderer span')).get(0),
    newGridPencilIcon: element.all(by.css('.icon-edit')).get(0),
    textarea: element(by.css('.ag-text-area-input')),
};

export const cplElements = {
    attributes: {
        attributesWait: element(by.css('cpl-attributes')),
        blockTitles: element.all(by.css('.cpl-attributes-block h3')),
        cplInfoLabels: element.all(by.css('.IHS-Color-HB-H7')).get(0).all(by.css('label:not(.shim-left-short)')),
        cplInfoLabelValues: element.all(by.css('.IHS-Color-HB-H7')).get(0).all(by.css('.shim-left')),
        cplImportOptionsLabels: element.all(by.css('.IHS-Color-HB-H7')).get(1).all(by.css('label:not(.shim-left-short)')),
        cplImportOptionsLabelValue: element.all(by.css('.IHS-Color-HB-H7')).get(1).element(by.css('label.shim-left-short')),
        cplAlertOptionsLabels: element.all(by.css('.IHS-Color-HB-H7')).get(2).all(by.css('label:not(.shim-left-short)')),
        cplAlertOptionsLabelValues: element.all(by.css('.IHS-Color-HB-H7')).get(2).all(by.css('label.shim-left-short')),
        emailInput: element.all(by.css('.add-email-field input')),
        emailCounter: element(by.css('form div.text-right')),
        newGridColumns: '.ag-header-cell',
        addedEmail: function (newEmail: string) {
            return element(by.cssContainingText('.attribute-wrapper', newEmail))
        },
        alertTypeInputs: element.all(by.css('.IHS-Color-HB-H7')).get(2).all(by.css('.flex-row.flex-center input')),
        autoPartMatchInput: element(by.id('A')),
        cplImportOptionAddText: element.all(by.css('.IHS-Color-HB-H7')).get(1).all(by.css('.ng-star-inserted')).get(2),
    },
    dashboard: {
        waitElementDashboard: element(by.css('cpl-dashboard-summary')),
        summarySectionTitle: element.all(by.css('.panel-info .panel-heading')),
        partsSummaryRowLabels: element.all(by.css('.panel-info .panel-body')).get(0).all(by.css('.row label')),
        partsSummaryRowCounts: element.all(by.css('.panel-info .panel-body')).get(0).all(by.css('.row span')),
        mfrSummaryRowLabels: element.all(by.css('.panel-info .panel-body')).get(1).all(by.css('.row label')),
        mfrSummaryRowCounts: element.all(by.css('.panel-info .panel-body')).get(1).all(by.css('.row span')),
        lifeCycleRowLabels: element.all(by.css('.panel-info .panel-body')).get(2).all(by.css('.row label')),
        lifeCycleRowCounts: element.all(by.css('.panel-info .panel-body')).get(2).all(by.css('.row span')),
        lifeCycleSection: element(by.css('cpl-dashboard-lifecycle')),
        enviromentalSection: element(by.css('cpl-dashboard-environmental')),
        mfrPrefSection: element(by.css('cpl-dashboard-mfr-prefs')),
        matchingSection: element(by.css('cpl-dashboard-matching')),
        sectionTitle: element(by.css('#dashSummary h2')),
        diagram: element.all(by.css('nvd3')),
        partAlertsLinks: element.all(by.css('.col-md-2.part-alerts-link')),
        viewSInglePageSections: element.all(by.css('.cpl-charts h2')),
        triangleInBar: element(by.css('.nv-markerTriangle')),
    },
    cplDetails: {
        gridTitle: element.all(by.css('.cpl-grid-table h3')),
        rightSideColumns: element.all(by.css('.ui-grid')).get(1)
            .all(by.css('.ui-grid-row')).get(0).all(by.css('.ui-grid-cell')),
        rightGridLinks: element.all(by.css('.ag-center-cols-viewport')).get(1).all(by.css('a')),
        addSliderFirstSectionFieldsLabels: element.all(by.css('.step-one .col-md-2.control-label')),
        addSliderPanelTitles: element.all(by.css('.panel-title strong')),
        addSliderFirstSectionInputs: element.all(by.css('.slider-panel .step-one [placeholder]')),
        addManufacturerPartsButton: element(by.css('.btn-default')),
        sliderFieldCounter: element.all(by.css('.slider-panel .step-one .col-md-3')),
        selectMfrContent: element(by.css('.select-mfr-parts-content')),
        addSliderSecondAccordion: element.all(by.css('.panel-body.step')),
        sliderNavTabs: element.all(by.css('select-manufacturer-parts .nav-tabs-2>li')),
        the2AccordionRadioButtonsLabel: element.all(by.css('.quick-search-panel-popup label.search-label')),
        the2AccordionRadioButtonsInput: element.all(by.css('.quick-search-panel-popup input')),
        the2AccordionSearchField: element(by.css('select-manufacturer-parts .input-ct>input')),
        clearSearchCriteriaXButton: element(by.css('select-manufacturer-parts .clear-input-btn')),
        enterPartDeatilsFieldsLabels: element.all(by.css('.details-column-container label')),
        enterPartDeatilsFieldsInputs: element.all(by.css('.details-column-container input')),
        sliderWorkSpaceCheckbox: element.all(by.css('select-part [row-index] .grid-checkbox-item')),
        reviewContainer: element(by.css('review-selected-manufacturer-parts')),
        reviewContainerCheckbox: element.all(by.css('review-selected-manufacturer-parts .grid-checkbox-item')),
        selectAPartPartNumberFirstRow: element.all(by.css('search-for-part [row-index="0"] .cap-formatter-cell')).get(4),
        selectAPartPartNumberSecondRow: element.all(by.css('search-for-part [row-index="1"] .cap-formatter-cell')).get(4),
        selectAPartPartNumberThirdRow: element.all(by.css('search-for-part [row-index="2"] .cap-formatter-cell')).get(4),
        selectFromCheckBoxPn: element.all(by.css('select-part [row-index="0"] .cap-formatter-cell')).get(0),
        reviewGridPartNumberFirstRowStyle: element.all(by.css('review-selected-manufacturer-parts .ag-center-cols-container .ag-row'))
            .get(0)
            .all(by.css('.ag-cell-value')).get(0),
        reviewGridPartNumberFirstRow: element.all(by.css('review-selected-manufacturer-parts .ag-center-cols-container .ag-row'))
            .get(0)
            .all(by.css('.cap-string-val')).get(0),
        reviewGridPartNumberSecondRow: element.all(by.css('review-selected-manufacturer-parts .ag-center-cols-container .ag-row'))
            .get(1)
            .all(by.css('.cap-string-val')).get(0),
        reviewGridPartNumberThirdRow: element.all(by.css('review-selected-manufacturer-parts .ag-center-cols-container .ag-row'))
            .get(2)
            .all(by.css('.cap-string-val')).get(0),
        tableText: element.all(by.css('.modal-body tbody tr:not(.ng-hide) td:nth-child(odd)')),
        reviewGridRowsNumber: element.all(by.css('.modal-content tbody tr')),
        reprocessIcon: element(by.css('.active .badge:not(.ng-hide)')),
        filterInput: element(by.css('.col-sm-9 input')),
        reviewGridCheckboxes: element.all(by.css('review-selected-manufacturer-parts .ag-pinned-left-cols-container .grid-checkbox-item'))
    },

    cplMatchingOptionModal: {
        matchingOptionsLabels: element.all(by.css('tr td:nth-child(odd) label')),
        matchingOptionsInputs: element.all(by.css('tr td:nth-child(odd) input')),
        defaultOptionsLabels: element.all(by.css('tr td:nth-child(even) label')),
        defaultOptionsInputs: element.all(by.css('tr td:nth-child(even) input')),
        alertText: element(by.css('.alert-text')),
    },
    tabs: element.all(by.css('.nav.nav-tabs-2 li a')),
};

export const matchingElements = {
    viewSuggestedMatchShadeHeader: element(by.css('.shade-content h2.shim-bottom')),
    viewSuggestedMatchModalSubtitle: element(by.css('.modal-body h2')),
    acceptMatchModalRows: element.all(by.css('tr')).get(1).all(by.css('td')),
    searchForMatchModalInfoHeaders: element.all(by.css('.modal-body .info-label strong')),
    searchForMatchModalInfoValues: element.all(by.css('.modal-body .info-label span')),
    searchForMatchModalPartNumberInput: element(by.css('#search-text')),
    checkboxInput: element.all(by.css('.grid-checkbox-item-wrapper .grid-checkbox-item')),
    deletePN: element.all(by.css('[title *=\'Delete Part Number\']')),
};

export const alertsElements: any = {
    alertTypeColumns: element.all(by.css('.ui-grid-cell.ui-grid-coluiGrid-00E4')),
    alertsByBomHeaderIcon: element.all(by.css('.gridicon.center-header')),
    alertsByIdSlider: {
        columnHeaders: element.all(by.css('.open .ui-grid-canvas .ui-grid-cell:nth-child(odd)')),
        columnValues: element.all(by.css('.open .ui-grid-canvas .ui-grid-cell:nth-child(even)')),
        columnValuesNumberLink: function (number: number) {
            return element(by.css(`.open .active [row-index="${number}"] a`))
        }
    },
    manageAlertSubs: {
        selectedFiles: element.all(by.css('.path')),
        subscribeEmailAddressesFiled: element(by.css('.email-input-field input')),
        addEmailButton: element(by.css('.btn-add-email')),
        clearEmailFieldButton: element.all(by.css('.shade-content .clear-input-btn')),
        emailFieldCounter: element.all(by.css('.chars-remaining')),
        warningMessage: element.all(by.css('.warning:not(.ng-hide)')),
        emailCell: element.all(by.css('.shade-content .ag-body-viewport .cap-formatter-cell')),
        emailByName: function (name: string) {
            return element(by.cssContainingText('.cap-string-val', name))
        },
        sortIcon: element(by.css('.shade-content .ag-header-cell-menu-button svg-symbol')),
        ascSortArrow: element(by.css('.middle-col .arrowUp')),
        descSortArrow: element(by.css('.middle-col .arrowDown')),
        checkboxLabels: element.all(by.css('subscribe-to-alerts-shade .checkbox input')),
        checkboxInputs: element.all(by.css('subscribe-to-alerts-shade .checkbox input')),
        statusIcon: element.all(by.css('.status-icon')),
    },

    manageEmailAddress: {
        rightSideTitle: element(by.css('.right-column h2')),
        rightSideNoteText: element(by.css('.right-column p')),
        emailInput: element(by.css('.relative.input-ct input')),
        emailCell: element.all(by.css('.email-item')),
        emailCellByName: function (name: string) {
            return element(by.cssContainingText('.email-item', name))
        },
        warningShade: element(by.css('.warning-shade')),
        warningShadeText: element(by.css('.warn-text')),
        warningShadeEmail: element(by.css('.list-item')),
        successShade: element(by.css('.success-shade')),
        successShadeText: element(by.css('.result-shade .bold')),
        statusIcon: element.all(by.css('.status-icon')),
    },
    findAndReplace: {
        findAndReplaceSHadeFieldLabels: element.all(by.css('.label-thin')),
        findAndReplaceShadeFieldInputs: element.all(by.css('.group input')),
        findAndReplaceRightColumnTitle: element(by.css('.modal-col>div>label')),
        findAndReplaceRightColumnNote: element(by.css('.info-section')),
        findAndReplaceWarningMessages: element.all(by.css('.content-wrap h2')),
        findAndReplaceWarningEmails: element.all(by.css('.content-wrap div.shim-bottom')),
        successMessage: element(by.css('div.bold'))
    }

};

export const helpPanelElements: any = {
    rightSideBigHelpButton: element(by.css('.help-switch')),
    helpPanel: element(by.css('.on .help-widget')),
    helpPanelTitle: element(by.css('body > h1')),
    helpPanelParagraph: element(by.css('body > p')),
    relatedHotSpot: element(by.css('.MCHelpControl-RelatedHotSpot_')),
    openedSubitem: element(by.css('.MCDropDown_Open > span')),
    openedSubitemLink: element(by.css('.MCDropDown_Open > span > a')),
    openedUnderSubitem: element(by.css('.MCDropDown_Open .MCDropDown_Open > span')),
    closedSubitem: function (name: string): ElementFinder {
        return element(by.cssContainingText('.MCDropDown_Closed > span > a', name))
    },
    openedSubitemByName: function (name: string): ElementFinder {
        return element(by.cssContainingText('.MCDropDown_Open > span', name))
    },
    closedSubtitleByName: function (name: string): ElementFinder {
        return element(by.xpath(`//a[contains(text(), "${name}")][not(contains(text(), "Set"))]
        /ancestor::div[contains(@class, "MCDropDown_Closed")]`));
    },

    buttonWithIndex: function (index: number = 0): ElementFinder {
        return element.all(by.css('.btn-deemphasized')).get(index);
    },
    expandAllButton: element.all(by.css('.btn-deemphasized')).get(2),
    openedSubitemAll: element.all(by.css('.MCDropDown_Open > span')),
    closedSubitemWait: element(by.css('.MCDropDown_Closed')),
}

export const iframeElements: any = {};

export const shadeElements: any = {
    openedShade: element(by.css('.panel-component-ct.in')),
    shadeTitle: element(by.css('.shade-content h2.shim-bottom-sm, .panel-component-ct.in .shim-bottom h2')),
    shadeCounter: element(by.css('.panel-component-ct.in .ui-grid-pager-count')),
    shadeCounterNewGrid: element(by.css('span.pagination-info')),
    dropdownToggle: element(by.css('.in .dropdown-toggle')),
    footerButtonByName: (buttonName: string): ElementFinder => {
        return element(by.css('.shade-footer')).element(by.buttonText(buttonName));
    },
    footerButtonsCss: '.shade-footer .btn.btn-default',
    shadeButton: function (buttonName: string) {
        return element(by.css('.common-filters-footer')).element(by.buttonText(buttonName));
    },
    shadeCancelButton: element(by.css('[id="cancel"]')),
    shadeSaveButton: element(by.css('[id="clear"]')),
    checkbox: element.all(by.css('boms-to-part-standardization-shade [class*=grid-checkbox-item] ' +
        '.grid-checkbox-item, boms-to-part-standardization-shade .ihs-checkbox-item .grid-checkbox-item')),
    bomTreeRowsBoms: function (number: number) {
        return element.all(by.css('.group-node')).get(number).element(by.css('a span'))
    },
    bomTreeNewGridRowsBoms: function (number: number) {
        return element.all(by.css('.group-node')).get(number).element(by.css('[*|href=\'#ihs-icon-flat-bom-file-mine\'] , [*|href=\'#ihs-icon-flat-bom-file-not-mine\']'))
    },
    bomTreeRowsFolders: function (number: number) {
        return element.all(by.css('.group-node')).get(number).element(by.css('span'))
    },

    bomTreeShaderow: function (rowNumber: number) {
        return element.all(by.css(`.toolbar-container [row-index="${rowNumber}"] .grid-checkbox-item`))
    },
    columnHeader: element.all(by.css('.toolbar-panel .ag-header-cell .ag-header-cell-text')),
    columnHeaderTitle: element.all(by.css('.shade-content .ag-header-cell')),
};

export const dropdownElements: any = {
    dropdownToggle: element.all(by.css('.dropdown-toggle')),
    modalDropdownToggle: element(by.css('.modal-body .dropdown-toggle')),
    openDropdown: element(by.css('.pl-select.dropdown-menu.primary.open')),
    openFiltersDropdown: element(by.css('.cb-details')),
    openDropdownSortBox: element(by.css('.dropdown-options.open')),
    dropdownValues: element.all(by.css('.pl-select.open .pl-select-item a')),
    dropdownActiveValue: element(by.css('.open .pl-select-item.active')),
    layoutTitles: element.all(by.css('.group-title')),
};

export const sliderElements: any = {
    openSliderBox: element(by.css('.slider-panel.open')),
    sliderTitle: element(by.css('.open h2.shim-bottom, .open h1.shim-bottom, .open h2.text-left')),
    rowCells: element.all(by.css('.open  .ui-grid-row')).first().all(by.css('.ui-grid-cell-contents')),
    closeSliderTab: element(by.css('.slider-panel.open .slider-tab')),
    xButtonSlider: element(by.css('.slider-panel.open .close-shade [class="svg-host-button"]')),
    sliderCheckboxSelector: element.all(by.css('.slider-panel.open .ihs-checkbox-item')),
    sliderTabs: element.all(by.css('.open .menu-item')),
    activeSliderTab: element(by.css('.open .menu-item.active')),
};

export const headerElements: any = {
    userRole: element(by.css('.greeting')),
    helpIcon: element.all(by.css('li.icon-area')).get(0),
    helpMenuLinks: element.all(by.css('li.icon-area')).get(0).all(by.css('a')),
    feedbackIcon: element.all(by.css('li.icon-area')).get(1),
    feedbackMenuLinks: element.all(by.css('li.icon-area')).get(1).all(by.css('a')),
    settingsIcon: element.all(by.css('li.icon-area')).get(2),
    settingsMenuLinks: element.all(by.css('li.icon-area')).get(2).all(by.css('a')),
    userIcon: element.all(by.css('li.icon-area')).get(3),
    userMenuLinks: element.all(by.css('li.icon-area')).get(3).all(by.css('a')),
};

export const resolutionModal: any = {
    labelCheckbox: element(by.css(".shim-left-sm.normalized-label")),
    hideCheckbox: element(by.id("hide-warning")),
    okayButton: element(by.css(".shim-right-mini.pull-right"))
};

export const transposeElements: any = {
    headers: element.all(by.css('.ag-header-cell')),
    unlockColumn: element.all(by.css('.grid-checkbox-item-wrapper .ag-header-cell-text')),
    lockColumn: element.all(by.css('.ag-header-cell .ag-header-label')),
    lockedColumnRowCellsWithContentByRowNumber: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-pinned-left-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    unlockedColumnRowCellsWithContentByRowNumber: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`.ag-body-viewport-wrapper [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    lockedColumnCellsWithContent: element.all(by.css('.ag-pinned-left-cols-container [row-index] .cap-formatter-cell')),
    unlockedColumnCellsWithContent: element.all(by.css('.ag-body-viewport [row-index] .cap-formatter-cell')),
    headerCheckbox: element.all(by.css('.ag-header-viewport .grid-checkbox-item')),
    buttonTooltip: element(by.css('.toolbar .transpose-button-wrapper')),
    allheaderCheckbox: element.all(by.css('.ag-header-cell .grid-checkbox-item')),
    headerText: element.all(by.css('.ag-header-cell .ag-header-cell-text'))
};

export const partStandardization: any = {
    partNameField: element(by.css('.flex-center .form-control')),
    descriptionField: element(by.css('.inputs-wrapper .form-control.ng-untouched')),
    buttonX: element(by.css('.slider-panel.open .close-shade')),
    closeSliderArrow: element(by.css('.slider-panel.open .slider-tab')),
    sliderButtons: element.all(by.css('.btn.btn-default')),
    modalBody: element(by.css('.modal-body .text-justify')),
    modalTitle: element(by.css('.modal-title')),
    tabButton: element.all(by.css('.nav-tabs-2.flex-0 > li')),
    shadeTitle: element(by.css('.flex-container > h2.shim-bottom')),
    tagByName: (name: string): ElementFinder => {
        return element(by.cssContainingText('.filter-selection-comp .panel-title', name))
    },
    panelTitle: element.all(by.css('.toolbar-info-panel-flex-container .panel-title')),
    deleteButton: element(by.css('input.toolbar-button.destruct')),
    toolbarButtons: element.all(by.css('.toolbar-button.arrow.default')),
    toolbarButtonBomDetails: element.all(by.css('toolbar-button[buttontitle]')),
    dropdownMenuButtons: element.all(by.css('.dropdown-menu .toolbar-list-btn')),
    shadeAddBomsButton: element(by.css('.btn.shim-left-sm')),
    toolbarButtonsBomsTab: element.all(by.css('part-standardization-boms .toolbar-button.default')),
    toolbarButtonsSummaryTab: element.all(by.css('part-standardization-summary .toolbar-button.default')),
    dropdownMenuButtonsBomsTab: element.all(by.css('part-standardization-boms .dropdown-menu .toolbar-list-btn')),
    dropdownMenuButtonsSummaryTab: element.all(by.css('part-standardization-summary .dropdown-menu .toolbar-list-btn')),
    reprocessIcons: element.all(by.css('.hdr-rel-info.cap-formatter-cell img')),
    reprocessIconByRow: (rowNumber: number): ElementFinder => {
        return element(by.css(`[row-index="${rowNumber}"] .hdr-rel-info.cap-formatter-cell img`))
    },
    newGridUnlockedColumnLinksByRowAndCellNumbers: (rowNumber: number, cellNumber: number): ElementArrayFinder => {
        return element.all(by.css(`part-standardization-summary .ag-center-cols-container [row-index="${rowNumber}"] .cap-formatter-cell`))
            .get(cellNumber).all(by.css('a'))
    },
    newGridRowsForBomsTab: element.all(by.css('part-standardization-boms .ag-pinned-left-cols-container .ag-row')),
    newGridRowsForSummaryTab: element.all(by.css('part-standardization-summary .ag-pinned-left-cols-container .ag-row')),
    commonGridRows: element.all(by.css('part-standardization-summary .ag-body-viewport [row-index],part-standardization-boms .ag-body-viewport [row-index]')),
    checkboxSelectorForBomsTab: element.all(by.css('part-standardization-boms [class*=grid-checkbox-item] .grid-checkbox-item, ' +
        '.ihs-checkbox-item .grid-checkbox-item')),
    rowCellsWithContent: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`part-standardization-summary .ag-body-viewport [row-index ="${rowNumber}"] .cap-formatter-cell, 
        part-standardization-boms .ag-body-viewport [row-index ="${rowNumber}"] .cap-formatter-cell`))
    },
    newGridHeaderNamesForBomsTab: element.all(by.css('part-standardization-boms .ag-header-cell-text')),
    newGridHeaderNamesForSummaryTab: element.all(by.css('part-standardization-summary .ag-header-cell-text')),
    newGridOpenHeaderSortButtonBomsTab: element.all(by.css('part-standardization-boms .ag-header-cell-menu-button')),
    newGridOpenHeaderSortButtonSummaryTab: element.all(by.css('part-standardization-summary .ag-header-cell-menu-button')),
    tabTooltips: element.all(by.css('.popover-body > div')),
    checkboxSelectorOnAddBomsShade: element.all(by.css('.grid-checkbox-item')),
    bomPageLoad: element.all(by.css(".ag-center-cols-viewport")).get(1),
    indenturedBomIconByRowNumber: function (rowNumber: number) {
        return element.all(by.css('.group-node')).get(rowNumber).element(by.css('[*|href="#ihs-icon-indentured-bom-folder-mine-closed"]'))
    },
    columnRowCellsWithContentSummaryTab: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`part-standardization-summary .ag-body-viewport [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    columnRowCellsWithContentBomsTab: (rowNumber: number): ElementArrayFinder => {
        return element.all(by.css(`part-standardization-boms .ag-body-viewport [row-index="${rowNumber}"] .cap-formatter-cell`))
    },
    columnCellsWithContentSummaryTab: element.all(by.css('part-standardization-summary .ag-body-viewport [row-index] .cap-formatter-cell')),
    columnCellsWithContentBomsTab: element.all(by.css('part-standardization-boms .ag-body-viewport [row-index] .cap-formatter-cell')),
    sliderTitle: element(by.css('.flex-container .shim-bottom')),
    closeXButton: element(by.css('.close-shade .svg-host-button')),
    columnLinksByRowAndCellNumbers: (rowNumber: number, cellNumber: number): ElementFinder => {
        return element.all(by.css(`part-standardization-summary .ag-body-viewport [row-index="${rowNumber}"] .cap-formatter-cell`))
            .get(cellNumber).element(by.css('a'));
    },
    newGridHeaderId: element(by.css('.ag-header-cell-sortable')),
    filterInputInMatchMfrNameColumn: element(by.css('mfr-typeahead  input')),
};

export const detailsForMfrSlider: any = {
    leftMenuLinks: element.all(by.css('[popoverplacement="right"]')),
};
export const dateRange: any = {

    buttonsFromTo: element.all(by.css("button.btn.btn-default.svg-icon-calendar")),
    selectMonthButton: element(by.css('select.custom-select[title=\'Select month\']')),
    selectMonthDropdown: (month: string): ElementArrayFinder => {
        return element.all(by.css(`option.ng-star-inserted[value="${month}"]`))
    },
    selectYearButton: element(by.css('select.custom-select[title=\'Select year\']')),
    selectYearDropdown: (year: number): ElementArrayFinder => {
        return element.all(by.css(`option.ng-star-inserted[value="${year}"]`))
    },
    selectDay: element.all(by.css('div.btn-light.ng-star-inserted:not(.text-muted)'))

};
export const growler: any = {
    growlerCrossButton: element.all(by.css('div.close-growler>svg-source')).last(),
    selectBomLink: (bomName: string): ElementArrayFinder => {
        return element.all(by.css(`.pseudo-link[text="${bomName}"]`))
    },
    selectLink: element.all(by.css('.growler-body .pseudo-link')),
    growlerBody: element.all(by.css('div.growler-body')),
    growlerTitle: element(by.css('.growlers-content h3.ng-star-inserted')),
    growlerStatus: element(by.css('.growlers-content div:nth-child(3)')),
    growlerReadyStatus: element.all(by.css('.progress-filled')).last(),
};
export const growlerNotificationPanel: any = {
    growlerCrossButton: element.all(by.css('div.close-growler>svg-source')).get(0),
    menuIcon: element(by.css('.menu-icon')),
    closeIconArrow: element(by.css('div.close-panel.ng-star-inserted > svg-source')),
    helpLink: element(by.css(' div.notifications-title.divider > a')),
    muteNotificationsCheckbox: element(by.css('#mute-notifications')),
    notificationPanelBody: element(by.css('div.notifications-panel-body.opened')),
    arrowButton: element(by.css('.close-panel.ng-star-inserted ')),
    notificationBadge: element(by.css('.notification-badge.ng-star-inserted'))
};

export const adminLoginElements = {
    loginField: element(by.css('.user-name')),
    passwordField: element(by.css('.user-password')),
    submitButton: element(by.css('.login-wrapper button')),
};

export const adminHomePage = {
    adminMeganav: element(by.css('.meganav')),
    panelTitles: element.all(by.css('.panel-body>h2')),
    manageUsersPanelLinks: element.all(by.css('.panel-body')).get(0).all(by.css('a')),
    manageUserGroupsLinks: element.all(by.css('.panel-body')).get(1).all(by.css('a')),
    manageUsersPanelImage: element.all(by.css('.img-container')).get(0),
    manageUserGroupsImage: element.all(by.css('.img-container')).get(1),

    searchField: element(by.css('.quick-search-input')),
    searchButton: element(by.css('.search-button')),
    clearSearchFieldButton: element(by.css('.clear-input-btn')),
    searchDropdown: element(by.css('.search-settings-expand')),
    searchRadioButtons: element.all(by.css('.search-type')),
    searchRadioButtonLabels: element.all(by.css('.search-type label')),
};

export const adminHeaderContent = {
    userRole: element(by.css('em')),
    logo: element(by.css('.header .ihs-logo')),
    headerLogoText: element(by.css('.header h1')),
    greetingTextWithName: element.all(by.xpath(`//div[@class = 'greeting']`)),
};

export const adminToolbarElements = {
    toolbarNames: element.all(by.css('.meganav-item a')),
    toolbarByButtontiltle: (title: string) => {
        return element.all(by.css(`.modal toolbar-button[buttontitle*="${title}"]`))
    }

};

export const adminUsersElements: any = {
    panelTitles: element.all(by.css('.side-bar.visible')),
    sideBarActiveItemName: element.all(by.css('.side-bar-item.active span')),
    columnHeadersNames: element.all(by.css('.ag-header-cell-text')),
    unlockedColumnHeadersNames: element.all(by.css('.ag-header-viewport .ag-header-cell-text')),
    lockedColumnHeadersNames: element.all(by.css('.ag-pinned-left-header .ag-header-cell-text')),
    openFilterButton: element.all(by.css('.ag-header-cell-menu-button')),
    allHyperlinksOnPage: element.all(by.css('.hyperlink-cell-renderer a')),
    hyperlinksByColumnName: (name: string) => {
        return element.all(by.css(`[col-id="${name}"] .hyperlink-cell-renderer a`))
    },
    selectedCellsNames: element.all(by.css('.ag-row-selected .hyperlink-cell-renderer a')),
    cellsByColumnName: element.all(by.css('.ag-pinned-left-cols-container .ag-row')),
    firstRowNames: element.all(by.css('.ag-row-first .ag-cell-value')),
    userNameInputField: element.all(by.css('#user-name')),
    userNamePasswordInputField: element.all(by.css('#password')),
    userGroupNameInputField: element.all(by.css('.form-control.input-sm')),
    activeStatus: element(by.css('#active-status-active')),
    currentEmail: element(by.css('#email')),
    userFullName: element(by.css('#full-name')),
    objectId: element(by.css('#objectId')),
    groupAdminRadioButtonTrue: element(by.css('#group-admin-yes')),
    userAdminRadioButtonTrue: element(by.css('#user-admin-yes')),
    kbAdminRadioButtonTrue: element(by.css('#kb-admin-yes')),
    readOnlyUserRadioButtonFalse: element(by.css('#read-only-user-no')),
    warningText: element.all(by.css('.shim-top-sm.warning')),
    resetButton: element.all(by.css('.close-shade.btn-deemphasized')),
    gridCheckBox: element.all(by.css('.ag-pinned-left-cols-container .ag-checkbox-input')),
    columnHeaderDiv: '.ag-header-cell.ag-header-cell-sortable',
    columnHeaderBorder: element.all(by.css('.ag-header-cell-resize')),
};

export const adminGroupUsersElements: any = {
    panelTitles: element.all(by.css('.side-bar.visible')),

};


export const adminGridElements = {
    openSortBox: element.all(by.css('.ag-tab-body')),
    menuOptionBox: element.all(by.css('.ag-menu-option')),
    columnFilterOptionByName: (optionName: string): ElementFinder => {
        return element(by.cssContainingText('.ag-menu-option-text', optionName))
    },
    columnHeaderByNumber: (number: number): ElementFinder => {
        return element.all(by.css('.ag-header-cell.ag-header-cell-sortable')).get(number)
    },
    gridButtonByName: function (name: string) {
        return element(by.cssContainingText('.toolbar-button', name))
    },
    activeToolbarButtons: element.all(by.css('.toolbar-button:not(.disabled)')),
    disabledToolbarButtons: element.all(by.css('.toolbar-button.disabled')),
    modifyUserButton: function (name: string) {
        return element(by.cssContainingText('.toolbar-button', name))
    },
    allheaderCheckbox: element.all(by.css('.ag-header .ag-wrapper')).get(0),
    checkedCells: element.all(by.css('.ag-checked'))
};

export const adminModalElements = {
    panelBody: element(by.css('.toolbar-panel.open')),
    modalHeader: element(by.css('.modal-header')),
    userNameText: element(by.xpath('//*[@for="userName"]')),
    mainText: element(by.css('.panel-component-ct p')),
    closeModalButtons: element.all(by.css('.close-shade.btn-primary')),
    mainHeaderText: element(by.css('label strong')),


    fieldNames: element.all(by.css('strong')),
    closeButtonByName: function (name: string) {
        return element(by.cssContainingText('.toolbar-container .close-shade', name))
    },
    textSingleRow: element(by.css('.modal-body .ng-star-inserted')),
};

export const adminExportModalElements = {
    panelBody: element(by.css('.modal-dialog')),
    modalTitle: element(by.css('.modal-title')),
    modalTitleDiv: element(by.css('.modal-title div')),
    modalBodeRows: element.all(by.css('.radio label')),

};

export const adminLeftSideBar = {
    sideBarItemNames: element.all(by.css('.side-bar-item-name')),
    sideBarItemNamesActive: element(by.css('.side-bar-item.active')),
    hideButton: element(by.css('.side-bar-hide-button')),
};

export const adminAddUsersElements: any = {
    addUserShade: element.all(by.className('flex-container shade-body')).get(0),
    labelsNames: element.all(by.css('.shade-body label:not(.radio-label) strong')),
    ghostText: element.all(by.css('.shade-body input[placeholder]')),

    expirationDate: element(by.css('.datepicker-input-wrapper input')),

    radioButtonSelection: function (idProperty: string) {
        return element.all(by.css(`.radio-wrapper input[id*='${idProperty}']`)).get(0);
    },

    userGroupName: element.all(by.css('#dropdown div a')).get(0),
};

export const adminModalUserGroupElements: any = {
    nameInputField: element.all(by.css('#user-group-name')),
    labelInputField: element.all(by.css('#user-group-label')),
    commodityField: element.all(by.css('.input-sm')),
    hazmatCheckBox: element(by.css('#hazmat-yes')),
    ercCheckBox: element(by.css('#erc-yes')),
    authorizedDistributorsCheckBox: element(by.css('#authorized-distributors-yes')),
    boeingOcmsExportCheckBox: element(by.css('#boeing-ocms-export-yes')),
    followXferHistoryCheckBox: element(by.css('#follow-xfer-history-yes')),


};

export const COOElements: any = {
    COOPopOver: element.all(by.css('.country-risk-popover')),
    COOLinksInGridAll: element.all(by.css('[row-index] .cap-hyperlink-val a')),
    COOLinksInGrid: function (row: number) {
        return element.all(by.css(`[row-index="${row}"] .cap-hyperlink-val a`)).get(0);
    },
    COOLinksInGridMultiple: function (row: number, index: number) {
        return element.all(by.css(`[row-index="${row}"] .cap-hyperlink-val a`)).get(index);
    },
    COOLinksInGridMultipleModal: function (index: number) {
        return element.all(by.css(`.modal-body .cap-hyperlink-val a`)).get(index);
    },
    heading: element.all(by.css('h2.shim-bottom-sm')).get(0),
    close: element(by.css('.country-risk-close-icon')),
    indicators: element.all(by.css('.country-risk-popover .risk-type')),
    indicatorScore: element.all(by.css('.country-risk-popover .risk-score')),
    paragraphText: element.all(by.css('.country-risk-popover p')),
    ihsLogo: element.all(by.css('.country-risk-learn-more .ihs-logo')),
    h1: element.all(by.css('.country-risk-learn-more h1')),
    h2: element.all(by.css('.country-risk-learn-more h2')),
    toLearnMoreLink: element.all(by.css('.country-risk-learn-more a')),

};
