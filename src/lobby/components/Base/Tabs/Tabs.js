import React from 'react';
import './_tabs.sass';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nav_class: "tabs__nav"
    };
  }

  onLoadInit() {
    document.addEventListener('DOMContentLoaded', function() {
      if (document.querySelectorAll('.tabs__nav').length != 0) {
        var tabs = document.querySelectorAll('.tabs__nav li');

        for (var i = 0; i < tabs.length; i++) {
          var ths = tabs[i];

          if (ths.classList.contains('active')) {
            var hash = ths.getAttribute('data-target');

            var target_tab = document.querySelector(hash);

            target_tab.style.display = "block";
            setTimeout(target_tab.classList.add('active'), 10);
          }

          ths.onclick = function(e) {
            var ths = e.target;
            var tabs_nav = ths.parentNode;

            while (true) {
              if (tabs_nav.tagName == 'UL') {
                break;
              } else {
                tabs_nav = tabs_nav.parentNode;
              }
            }
            // alert(tabs_nav.classList)

            var li_arr = tabs_nav.querySelectorAll('li')
            for (var j = 0; j < li_arr.length; j++) {
              li_arr[j].classList.remove('active');
            }

            while (true) {
              if (ths.tagName == 'LI') {
                ths.classList.add('active');
                break;
              } else {
                ths = ths.parentNode;
              }
            }

            // ------

            var target_hash = ths.getAttribute('data-target');
            var target_tab = document.querySelector(target_hash);

            var target_parent = target_tab.parentNode;
            var tabs_siblings = target_parent.querySelectorAll('.tabs__content');

            for (var k = 0; k < tabs_siblings.length; k++) {
              var tab = tabs_siblings[k];
              tab.classList.remove('active');
              // tab.style.display = null;
            }

            target_tab.style.display = "block";
            setTimeout(function() {
              target_tab.classList.add('active');
            }, 10);
          }
        }
      }
    });
  }


  render() {
    this.onLoadInit();
    var nav_subclass = this.props.navClass ? ' ' + this.props.navClass : '';

    return (
      <div className="tabs__outer">
        <ul className={this.state.nav_class + nav_subclass}>{
          this.props.navigation.map((content, index) => {
            var text = content[0];
            var hash = content[1];
            var cls = content[2];

            return <li className={cls} data-target={hash}>{text}</li>
          })
        }</ul>

        <div className="tabs">{
          this.props.content.map((content, index) => {
            var tab = content[0];
            var hash = content[1];

            return <div className="tabs__content" id={hash}>{tab}</div>
          })
        }</div>
      </div>
    )
  }
}

export default Tabs;
