<template>
  <!--<svg :class="svgClass" aria-hidden="true">-->
    <!--&lt;!&ndash;<use xlink:href="/src/icons/svg/email.svg"/>&ndash;&gt;-->
    <!--<use :xlink:href="iconName"/>-->
  <!--</svg>-->

  <span class="fa facimd-icon" :class="iconName"></span>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `fa-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

  .facimd-icon{
    font-size: 14 px;
    margin-right: 16px;
  }
</style>
