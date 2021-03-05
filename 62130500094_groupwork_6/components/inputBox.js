app.component('input-box',{
    props:['varName', 'type', 'required', 'maxLength', 'errorsObj'],
    data() {
        return {
            inputValue: null,
            haveError: false
        };
    },
    template:
    /*html*/
    `
    <div class="flex flex-col">
        <label :for="varName" class="text-sm leading-7 text-gray-600"><slot></slot> <span v-show="required == 1" class="text-red-600">*</span></label>
        <input :maxlength="maxLength==0 ? false : maxLength" :type="type" :id="varName" @input="updateFormDataElement" v-model="inputValue" :name="varName" class="bg-gray-200 rounded px-4 py-2">
        <span v-show="haveError" class="text-red-500 font-medium" v-for="eachErrorInfo in errorInfo">{{eachErrorInfo}}</span>
    </div>
    `,
    computed: {
        errorInfo() {
            this.haveError = this.errorsObj[this.varName] ? true : false;
            return this.errorsObj[this.varName] ? this.errorsObj[this.varName] : ["No Error!"];
        }
    },
    methods: {
        updateFormDataElement() {
            this.$emit('box-input-changed',{name: this.varName, value: this.inputValue});
        }
    }
});