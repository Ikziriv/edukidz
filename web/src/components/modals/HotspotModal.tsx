import React from 'react';
import { useStoryStore } from '../../stores/storyStore';
import { Volume2 } from 'lucide-react';
import { soundEngine } from '../../services/audioEngine';
import { Modal, ModalHeader } from '../ui/Modal';
import { HotspotIcon } from '../ui/HotspotIcon';
import { speak, useT } from '../../lib/i18n';

export const HotspotModal: React.FC = () => {
  const activeHotspotId = useStoryStore((s) => s.activeHotspotId);
  const closeHotspot = useStoryStore((s) => s.closeHotspot);
  const currentScene = useStoryStore((s) => s.currentScene);
  const language = useStoryStore((s) => s.language);
  const t = useT();

  const hotspot = activeHotspotId ? currentScene.hotspots.find((h) => h.id === activeHotspotId) : undefined;

  return (
    <Modal open={!!hotspot} onClose={closeHotspot} labelledBy="hotspot-title" closeLabel={t('Tutup', 'Close')}>
      {hotspot && (
        <>
          <ModalHeader
            id="hotspot-title"
            eyebrow={t('Kartu Keajaiban', 'Wonder Card')}
            title={hotspot.title[language]}
            icon={<HotspotIcon icon={hotspot.icon} size={24} />}
          />

          <p className="text-base md:text-[17px] leading-relaxed text-ink mb-6 bg-sunken p-4 md:p-5 rounded-2xl border border-line">
            {hotspot.explanation[language]}
          </p>

          <div className="flex flex-col-reverse sm:flex-row gap-2.5">
            <button type="button" onClick={closeHotspot} className="btn btn-ghost sm:w-auto">
              {t('Kembali', 'Got it')}
            </button>
            <button
              type="button"
              data-autofocus
              onClick={() => {
                soundEngine.playSFX('chime');
                speak(`${hotspot.title[language]}. ${hotspot.explanation[language]}`, language);
              }}
              className="btn btn-primary flex-1"
            >
              <Volume2 size={18} aria-hidden="true" />
              {t('Bacakan untukku', 'Read it to me')}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};
