import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel } from '../../store/guilds';
import { closedModal } from '../../store/ui';
import NormalButton from '../buttons/normal-button';
import Input from '../forms/input';

const CreateChannel: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const openModal = useSelector((s: Store.AppStore) => s.ui.openModal);
  const guild = useSelector((s: Store.AppStore) => s.ui.activeGuild);

  const create = (data) => {
    dispatch(createChannel(guild!.id, data.name));
    setValue('name', '');
  };
  
  return (
    <ReactModal
      className="bg-bg-primary overflow-auto fixed w-1/4 inset-x-1/3 inset-y-1/3 rounded-lg outline-none"
      appElement={document.querySelector('#root')!}
      isOpen={openModal === CreateChannel.name}
      onRequestClose={() => dispatch(closedModal())}>
      <form
        className="flex flex-col h-full"
        onSubmit={handleSubmit(create)}>
        <header className="text-center mb-5 p-5">
          <h1 className="text-2xl font-bold inline">Create Text Channel</h1>
        </header>
      
        <div className="flex-grow p-5">
          <Input
            label="Channel Name"
            name="name"
            register={register} />
        </div>

        <footer className="bg-bg-secondary">
          <NormalButton className="float-right">Create</NormalButton>
        </footer>
      </form>
    </ReactModal>
  );
}
 
export default CreateChannel;