import { Record } from "@/utils/recordUtils";

type EditRecordFormProps = {
  editRecord: Record | null;
  setEditRecord: React.Dispatch<React.SetStateAction<Record | null>>;
  handleUpdate: (updatedRecord: Record) => void;
};

export default function EditRecordForm({
  editRecord,
  setEditRecord,
  handleUpdate,
}: EditRecordFormProps) {
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editRecord) {
      handleUpdate(editRecord);
    }
  };

  if (!editRecord) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-10">
      <div className="bg-white p-[20px] rounded-2xl min-w-[360px] max-w-[90%] text-center">
        <h3 className="my-6 text-lg font-bold">ごはんの記録の編集</h3>
        <form onSubmit={handleEditSubmit} className="flex flex-col w-full">
          <label className="flex justify-between items-center gap-4 my-1">
            日付
            <input
              type="date"
              value={editRecord.date}
              onChange={(e) =>
                setEditRecord({ ...editRecord, date: e.target.value })
              }
              className="ml-4 p-2 border rounded-lg w-3/4"
              required
            />
          </label>
          <label className="flex justify-between  items-center gap-4 my-1">
            料理名
            <input
              type="text"
              value={editRecord.dishName}
              onChange={(e) =>
                setEditRecord({ ...editRecord, dishName: e.target.value })
              }
              className="ml-4 p-2 border rounded-lg w-3/4"
              required
            />
          </label>
          <label className="flex justify-between  items-center gap-4 my-1">
            ジャンル
            <select
              value={editRecord.category}
              onChange={(e) =>
                setEditRecord({ ...editRecord, category: e.target.value })
              }
              className="ml-4 p-2 border rounded-lg w-3/4"
              required
            >
              <option value="和食">和食</option>
              <option value="洋食">洋食</option>
              <option value="中華">中華</option>
              <option value="その他">その他</option>
            </select>
          </label>
          <label className="flex justify-between  items-center gap-4 my-1">
            メモ
            <textarea
              value={editRecord.note}
              onChange={(e) =>
                setEditRecord({ ...editRecord, note: e.target.value })
              }
              className="ml-4 p-2 border rounded-lg w-3/4"
            />
          </label>
          <button
            type="submit"
            className=" mt-2 mx-4 py-2 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200"
          >
            保存
          </button>
          <button
            type="button"
            onClick={() => setEditRecord(null)}
            className=" mt-2 mx-4 py-2 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200"
          >
            キャンセル
          </button>
        </form>
      </div>
    </div>
  );
}
