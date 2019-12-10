<template>
    <div :class="isMobile ? 'main':'mainmob'">
        <div class="main-container">
            <div style="display: flex; flex-direction: column; margin-bottom: 150px;">
                <p class="error">{{ error }}</p>
                <p class="decode-result">Отсканиируйте ваш QR-code!<br> <b>{{ result }}</b></p>
                <qrcode-stream @decode="onDecode" @init="onInit" />
            </div>
        </div>
    </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import axios from 'axios';

export default {
    components: {
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    },

    data () {
        return {
            result: '',
            error: ''
        }
    },

    methods: {
        isMobile() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },
        onDecode (result) {
            this.result = result;
            this.$router.push('/quiz');
        },

        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permisson"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                }
            }
        }
    }
}
</script>

<style scoped>
    >>>.qrcode-stream__camera,
    >>>.qrcode-stream__pause-frame {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        background-size: cover;
        max-width: inherit !important;
        max-height: inherit !important;
    }
    >>>.qrcode-stream__inner-wrapper {
        position: inherit !important;
        max-width: inherit !important;
        max-height: inherit !important;
        z-index: inherit !important;
    }
    .decode-result {
        width: 70%;
        text-align: left;
        margin: auto;
        margin-bottom: 10px;
        line-height: 40px;
        font-size: 32px;
    }
    >>>.overlay {
        display: flex;
        justify-content: center;
    }
    >>>.inside {
        max-width: 100%;
        max-height: 100%;
    }
    >>>.camera {
        max-width: 70%;
        max-height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
    }
    .main
    {
        background-image: url("../../public/images/auth.png");
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main p
    {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 40px;
        color: #FFFFFF;
    }
    .mainmob {
        background-color: #467DE4;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .upload
    {
        padding: 20px 0;
        background-color: #467DE4;
        color: #3399ff;
    }
    .upload-container
    {
        border: 1px dashed #FFFFFF;
        margin-right: 314px;
    }
    .main-container {
        max-width: 100%;
        max-height: 100%;
        display: flex;
        justify-content: center;
    }
</style>
