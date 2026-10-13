import St from 'gi://St';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class GpuIndicatorExtension extends Extension {
    enable() {
        this._indicator = new PanelMenu.Button(0.5, 'GPU Indicator');

        this._label = new St.Label({
            text: 'GPU: ...',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this._indicator.add_child(this._label);

        Main.panel.addToStatusArea('gpu-indicator', this._indicator);

        this._updateGpuMode();

        this._timeoutId = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT,
            5,
            () => {
                this._updateGpuMode();
                return GLib.SOURCE_CONTINUE;
            }
        );
    }

    disable() {
        if (this._timeoutId) {
            GLib.source_remove(this._timeoutId);
            this._timeoutId = null;
        }
        this._indicator.destroy();
        this._indicator = null;
        this._label = null;
    }

    _updateGpuMode() {
        try {
            const [success, stdout] = GLib.spawn_command_line_sync('envycontrol --query');
            if (success) {
                const mode = new TextDecoder().decode(stdout).trim();
                this._label.set_text(`GPU: ${mode}`);
            } else {
                this._label.set_text('GPU: ?');
            }
        } catch (e) {
            this._label.set_text('GPU: error');
        }
    }
}
