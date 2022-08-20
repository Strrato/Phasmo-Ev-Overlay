var Maps = function(){

  this.maps = {};
  this.loaded = false;
  this.isVisislbe = false;
  this._currentMap = "";
  var _self = this;

  this._loadMapsButtons = () => {
    let html = '';
    let i = 0;
    for(let mapName in _self.maps){
      html += '<button type="button" id="btn-map-'+ ++i +'" class="btn-map" value="'+ mapName +'">('+ i +') '+ mapName +'</button>';
    }
    document.getElementById('map-list').innerHTML = html;
  };

  this._setButtonsEvent = () => {
    let btns = document.getElementsByClassName('btn-map');
    for(let i in btns){
      let btn = btns[i];
      btn.onclick = () => { _self._onBtnClick(btn); };
    }

    let shiftPressed = false;
    let keysMaps = Array.from(Array(document.getElementsByClassName('btn-map').length).keys())
    keysMaps = keysMaps.map(i => 'Numpad' + (i + 1));

    document.onkeyup = (e) => {
      console.log(e);
      if(e.code == 'Escape' || e.code == 'Semicolon'){
        _self.toggle();
      }
      if (keysMaps.indexOf(e.code) > -1){
        document.getElementById('btn-map-' + e.key).click();
      }
    };
  };

  this._onBtnClick = (btn) => {
    if (_self._currentMap !== btn.value){
      let map = _self.maps[btn.value];
      document.getElementById('map-content').innerHTML = map;
      let elSvg = document.querySelector('#map-content svg');
      elSvg.style.width = '100%';
      elSvg.style.height = '100%';
      _self._currentMap = btn.value;
      _self._toggleBtnActive(btn);
    }
  };

  this._toggleBtnActive = (btnActive) => {
    Array.from(document.querySelectorAll('button.selected')).forEach((el) => el.classList.remove('selected'));
    btnActive.classList.add('selected');
  };

  this.setMaps = (maps) => {
    _self.maps = maps;
    _self.loaded = true;
    _self._loadMapsButtons();
    _self._setButtonsEvent();
  }

  this.isReady = () => {
    return _self.loaded;
  }

  this.toggle = () => {
    if (_self.loaded){
      let elContainer = document.getElementById('map-overlay');
      _self.isVisislbe = !_self.isVisislbe;
      if (_self.isVisislbe){
        elContainer.classList.remove('d-none');
        if (document.querySelectorAll('button.selected').length == 0){
          document.getElementById('btn-map-1').click();
        }
      }else {
        elContainer.classList.add('d-none');
      }
    }
  };
  
}

window.Maps = Maps;