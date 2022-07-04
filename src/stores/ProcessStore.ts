import { observable, action } from 'mobx';
import { Request } from '~/utils';
import { Constants } from '~/common';
import axios from 'axios';
import _ from 'lodash';

export type TVideo = {
    uri: string;
    name: string;
    type: string;
};

export type TStatus = 'ready' | 'uploaded' | 'processing' | 'done' | 'error';

export type TResult = {
    video_id: number;
    prediction?: number;
    revisitation?: number;
    loudness?: number;
    video_data?: any;
    thumbnail? : string;
    uploaded_at?: string;
    predicted_at?: string;
    status: TStatus;
};

export const ProcessStore: any = observable({

    survey: {} as Object,
    result: {} as Object,
    loading: false,

    setLoading: action((loading: boolean = true) => {
        ProcessStore.loading = loading;
    }),

    setSurvey: action((survey: Object) => {
        ProcessStore.survey = _.cloneDeep(survey);
    }),

    resetSurvey: action(() => {
        ProcessStore.survey = {};
    }),

    resetResult: action(() => {
        ProcessStore.result = {};
    }),

    uploadAudio: action(async (location: string, survey: Object=ProcessStore.survey) => {
        try {
            ProcessStore.loading = true;
            const formData = new FormData();
            const ext = location.split('.').pop();
            formData.append('audio', {
                uri: location,
                name: 'audio.' + ext,
                type: 'audio/' + ext,
            });
            formData.append('survey', JSON.stringify(survey))
            console.log('[Starting upload]', formData);
            const data = await Request.post('/upload/audio', formData);
            ProcessStore.result = _.cloneDeep(data);
            console.log('[Upload completed]', data);
            ProcessStore.loading = false;
        } catch (e) {
            console.log(e);
        }
    }),
});

