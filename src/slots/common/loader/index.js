import React from 'react';
import * as PIXI from "pixi.js";
import {actions} from "../actions";

var FontFaceObserver = require('fontfaceobserver');

export default class LoaderConstructor {
    constructor(resources, dispatch) {
        this.resourses = resources;
        this.dispatch = dispatch;
    }

    init() {
        let font = new FontFaceObserver('CustomFont');

        font.load().then(function () {
            console.log('Font is available');
            loadOtherAssets();
        }, function () {
            console.log('Font is not available');
            loadOtherAssets()
        });

        let loadOtherAssets = () => {
            this.loader = new PIXI.Loader();
            this.addResources();

            this.loader.load((loader, resources) => {});
            this.loader.onProgress.add(this.onProgress.bind(this));
            this.loader.onError.add(this.onError);
            this.loader.onLoad.add(this.onLoad);
            this.loader.onComplete.add(this.onComplete.bind(this));
        }
    }

    addResources() {
        const resourses = this.resourses;
        for(let item in resourses) {
            this.loader.add(item, resourses[item], { timeout: 60000 });
        }
    }

    onProgress(params) {
        this.dispatch(actions.loadingProcess({progressLoading: params.progress}))
    }
    onError(params) {}
    onLoad(params) {}
    onComplete(params) {
        this.dispatch(actions.loadComplete({resources: this.loader.resources}));
    }
}