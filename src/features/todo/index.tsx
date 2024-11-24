"use client";

import { useState } from "react";
import { v4 } from "uuid";

type LayoutProps = {
  children: React.ReactNode;
};

type BaseOptions = { value: number; label: string };

type SelectProps<T> = {
  placeholder: string;
  optionsList: T[] | null;
  selectedValue?: T | null;
  valueToShow?: keyof T;
  onSelect: (arg: T) => void;
};

type SelectLeadNumber = {
  value: number;
  label: string;
  leadNumber: number;
};

type DatePickerProps = {
  selectedDate: string;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type ButtonVarients = "Primary" | "Secondary" | "Tertiary";

type ButtonProps = {
  btnText: string;
  varient?: ButtonVarients;
  onClick: () => void;
};

type TableRowData = {
  id: string;
  itemName: string;
  itemCode: number;
  itemDescription: string;
  taxRate: number;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
};

type TableColumnsProps<T> = {
  label: string;
  field: keyof T;
};

type TableComponentProps<T, U> = {
  data: T[] | [];
  columns: U[] | [];
  showAddIcon?: boolean;
  handleAddIconClick?: () => void;
};

type BaseAddress = {
  contactPerson: string;
  contactNumber: string;
  companyAddress: string;
  panNumber: string;
  branchName: string;
};

type Address = {
  billingAddress: BaseAddress;
  clientBillingAddress: BaseAddress;
  clientShippingAddress: BaseAddress;
};

type SalesQuotationHeaderSectionProps = {
  selectedCompany: BaseOptions | null;
  sqNumber: string;
  isDateCalendarOpen: boolean;
  selectedCompanyLeadNumberDropDown: SelectLeadNumber[] | null;
  selectedLeadNumber: SelectLeadNumber | null;
  sqDate: string;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateCalendarToggle: () => void;
  handleCompanySelect: (option: BaseOptions) => void;
  handleCompanyLeadNumberSelect: (option: SelectLeadNumber) => void;
};

type SalesQuotationAddressSectionProps = {
  address: Address;
  isShippingAddressSame: boolean;
  handleToggleIsShippingAddressSame: () => void;
};

type SalesQuotationItemTableSectionProps = {
  itemTableDetails: TableRowData[];
  itemTableColumns: TableColumnsProps<TableRowData>[];
  handleAddTableRow: () => void;
};

const BASE_SQ_TAG = "SQ-2024";

const COMPANY_SELECT_DROPDOWN = [
  {
    value: 1,
    label: "Google",
  },
  {
    value: 2,
    label: "Microsoft",
  },
  {
    value: 3,
    label: "Yahoo",
  },
];

const LEAD_NUMBERS = [
  {
    value: 1,
    label: "Google",
    leadNumber: 3109,
  },
  {
    value: 2,
    label: "Microsoft",
    leadNumber: 5646,
  },
  {
    value: 3,
    label: "Google",
    leadNumber: 7865,
  },
  {
    value: 4,
    label: "Yahoo",
    leadNumber: 7890,
  },
];

const ITEM_TABLE_COLUMNS: TableColumnsProps<TableRowData>[] = [
  {
    label: "Item",
    field: "itemName",
  },
  {
    label: "Code",
    field: "itemCode",
  },
  {
    label: "Description",
    field: "itemDescription",
  },
  {
    label: "Tax Rate",
    field: "taxRate",
  },
  {
    label: "Qty.",
    field: "quantity",
  },
  {
    label: "Unit Price",
    field: "unitPrice",
  },
  {
    label: "Disc.%",
    field: "discount",
  },
  {
    label: "Total",
    field: "total",
  },
];

const generateSQNumber = (baseTag: string) => {
  const suffixTag = new Date();
  const randomTag = suffixTag.getSeconds();
  return `${baseTag}-${randomTag}`;
};

const generateDate = () => {
  const date = new Date();
  return date.toDateString();
};

const Header = () => {
  return <div className="bg-gray-100 p-4">Header</div>;
};

const SideBar = () => {
  return <div className="w-1/6 p-4 bg-gray-100">Sidebar</div>;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-svh w-svw">
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="px-4 flex flex-col overflow-scroll min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

const Button = ({ btnText, varient = "Primary", onClick }: ButtonProps) => {
  const getButtonClasses = (varient: ButtonVarients) => {
    switch (varient) {
      case "Primary":
        return "bg-blue-400 text-white hover:bg-white hover:text-blue-400";
      case "Secondary":
        return "bg-red-400 text-white hover:bg-white hover:text-red-400";
      case "Tertiary":
        return "bg-green-400 text-white hover:bg-white hover:text-green-400";
      default:
        return null;
    }
  };

  return (
    <button
      type="submit"
      className={`border px-4 py-2 rounded-md ${getButtonClasses(varient)}`}
      onClick={() => onClick()}
    >
      {btnText}
    </button>
  );
};

const Select = <T extends BaseOptions>({
  placeholder,
  optionsList,
  selectedValue,
  valueToShow,
  onSelect,
}: SelectProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption =
      optionsList &&
      optionsList.find(
        (option) => Number(option.value) === Number(event.target.value)
      );
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  const renderLabel = (item: T) => {
    if (valueToShow && item[valueToShow] !== undefined) {
      return String(item[valueToShow]);
    }
    return String(item.label);
  };

  return (
    <select value={selectedValue?.value ?? ""} onChange={handleChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {optionsList &&
        optionsList.map((item, index) => (
          <option key={index} value={item.value}>
            {renderLabel(item)}
          </option>
        ))}
    </select>
  );
};

const DatePicker = ({ selectedDate, handleDateChange }: DatePickerProps) => {
  return (
    <input
      type="date"
      value={new Date(selectedDate).toISOString().split("T")[0]}
      onChange={handleDateChange}
      className="border px-2 py-1 rounded"
    />
  );
};

const BaseInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="border px-2 py-1 rounded" {...props} />;
};

const TableComponent = <T, U extends TableColumnsProps<T>>({
  data,
  columns,
  showAddIcon = false,
  handleAddIconClick = () => {},
}: TableComponentProps<T, U>) => {
  return (
    <div style={{ overflowX: "auto", position: "relative" }}>
      {showAddIcon && (
        <div
          className="absolute -right-2 -top-2 bottom-auto cursor-pointer"
          onClick={handleAddIconClick}
        >
          <p className="w-4 h-4 p-4 bg-blue-400 rounded-full flex items-center justify-center hover:text-blue-400 hover:bg-white text-white">
            +
          </p>
        </div>
      )}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr className="border-2 p-2 text-left bg-gray-100">
            <th className="p-2">S.No.</th>
            {columns.map((col, index) => (
              <th className="p-2" key={index}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-100 cursor-pointer border-x-2 ${
                rowIndex % 2 === 0 ? "" : "bg-gray-100"
              }`}
            >
              <td className="text-left p-2 border-b-2">{rowIndex + 1}.</td>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="text-left p-2 border-b-2">
                  {String(row[col.field])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SalesQuotationHeaderSection = ({
  selectedCompany,
  sqNumber,
  isDateCalendarOpen,
  selectedCompanyLeadNumberDropDown,
  selectedLeadNumber,
  sqDate,
  handleDateChange,
  handleDateCalendarToggle,
  handleCompanySelect,
  handleCompanyLeadNumberSelect,
}: SalesQuotationHeaderSectionProps) => {
  return (
    <div className="my-4 flex items-center justify-between">
      <Select
        placeholder="Select Lead"
        optionsList={COMPANY_SELECT_DROPDOWN}
        selectedValue={selectedCompany}
        onSelect={(option) => handleCompanySelect(option)}
      />
      <div className="flex gap-4 items-center justify-center">
        <Select
          valueToShow={"leadNumber"}
          placeholder="Select LeadNo."
          optionsList={selectedCompanyLeadNumberDropDown}
          selectedValue={selectedLeadNumber}
          onSelect={(option) => handleCompanyLeadNumberSelect(option)}
        />
        <span>{sqNumber}</span>
        <div className="flex items-center justify-center w-[152.5px] h-[36px]">
          {isDateCalendarOpen ? (
            <DatePicker
              selectedDate={sqDate}
              handleDateChange={handleDateChange}
            />
          ) : (
            <span className="cursor-pointer" onClick={handleDateCalendarToggle}>
              {sqDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const SalesQuotationAddressSection = ({
  address,
  isShippingAddressSame,
  handleToggleIsShippingAddressSame,
}: SalesQuotationAddressSectionProps) => {
  return (
    <div className="h-[260px] pb-4 gap-4 flex items-start justify-between">
      <div className="w-1/3 border-r-2 h-full">
        Billing Address
        <div className="flex flex-col gap-2 pt-4 pr-4">
          <BaseInput
            placeholder="Branch Name"
            value={address.billingAddress.branchName}
          />
          <BaseInput
            placeholder="Company Address"
            value={address.billingAddress.companyAddress}
          />
          <BaseInput
            placeholder="PAN Number"
            value={address.billingAddress.panNumber}
          />
          <BaseInput
            placeholder="Contact Person"
            value={address.billingAddress.contactPerson}
          />
          <BaseInput
            placeholder="Contact Number"
            value={address.billingAddress.contactNumber}
          />
        </div>
      </div>
      <div className="w-1/3 border-r-2 h-full">
        Client Billing Address
        <div className="flex flex-col gap-2 pt-4 pr-4">
          <BaseInput
            placeholder="Branch Name"
            value={address.clientBillingAddress.branchName}
          />
          <BaseInput
            placeholder="Company Address"
            value={address.clientBillingAddress.companyAddress}
          />
          <BaseInput
            placeholder="PAN Number"
            value={address.clientBillingAddress.panNumber}
          />
          <BaseInput
            placeholder="Contact Person"
            value={address.clientBillingAddress.contactPerson}
          />
          <BaseInput
            placeholder="Contact Number"
            value={address.clientBillingAddress.contactNumber}
          />
        </div>
      </div>
      <div className="w-1/3 h-full">
        <div className="flex items-center justify-between gap-4">
          Client Shipping Address
          <div
            className="flex items-center justify-start gap-2 cursor-pointer"
            onClick={handleToggleIsShippingAddressSame}
          >
            <BaseInput type="checkbox" checked={isShippingAddressSame} />
            <label>Mark As Same</label>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-4 pr-4">
          <BaseInput
            placeholder="Branch Name"
            value={address.clientShippingAddress.branchName}
          />
          <BaseInput
            placeholder="Company Address"
            value={address.clientShippingAddress.companyAddress}
          />
          <BaseInput
            placeholder="PAN Number"
            value={address.clientShippingAddress.panNumber}
          />
          <BaseInput
            placeholder="Contact Person"
            value={address.clientShippingAddress.contactPerson}
          />
          <BaseInput
            placeholder="Contact Number"
            value={address.clientShippingAddress.contactNumber}
          />
        </div>
      </div>
    </div>
  );
};

const SalesQuotationItemTableSection = ({
  itemTableDetails,
  itemTableColumns,
  handleAddTableRow,
}: SalesQuotationItemTableSectionProps) => {
  return (
    <div className="h-[calc(100vh-460px)] flex gap-4 mb-4 border-y-2">
      <div className="w-2/3 border-r-2 h-full -mr-2 pt-2 pr-2 overflow-scroll ">
        <TableComponent
          showAddIcon
          data={itemTableDetails}
          handleAddIconClick={handleAddTableRow}
          columns={itemTableColumns}
        />
      </div>
      <div className="w-1/3 h-full">Calculation</div>
    </div>
  );
};

const SalesQuotationFooterSection = () => {
  const handleSubmit = () => {};
  const handleCancel = () => {};

  return (
    <div className="flex items-center justify-end pb-4">
      <div className="flex items-center justify-center gap-4">
        <Button onClick={handleCancel} btnText="Cancel" varient="Secondary" />
        <Button onClick={handleSubmit} btnText="Submit" varient="Primary" />
      </div>
    </div>
  );
};

const SalesQuotation = () => {
  const [selectedCompany, setSelectedCompany] = useState<BaseOptions | null>(
    null
  );
  const [selectedLeadNumber, setSelectedLeadNumber] =
    useState<SelectLeadNumber | null>(null);
  const [
    selectedCompanyLeadNumberDropDown,
    setSelectedCompanyLeadNumberDropDown,
  ] = useState<SelectLeadNumber[] | null>(null);
  const [sqNumber] = useState(generateSQNumber(BASE_SQ_TAG));
  const [sqDate, setSqDate] = useState<string>(generateDate());
  const [isDateCalendarOpen, setIsDateCalendarOpen] = useState(false);
  const [address, setAddress] = useState<Address>({
    billingAddress: {
      contactPerson: "",
      contactNumber: "",
      companyAddress: "",
      panNumber: "",
      branchName: "",
    },
    clientBillingAddress: {
      contactPerson: "",
      contactNumber: "",
      companyAddress: "",
      panNumber: "",
      branchName: "",
    },
    clientShippingAddress: {
      contactPerson: "",
      contactNumber: "",
      companyAddress: "",
      panNumber: "",
      branchName: "",
    },
  });
  const [isShippingAddressSame, setIsShippingAddressSame] = useState(false);
  const [itemTableDetails, setItemTableDetails] = useState<TableRowData[]>([
    {
      id: v4(),
      itemName: "",
      itemCode: 0,
      itemDescription: "",
      taxRate: 0,
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      total: 0,
    },
  ]);

  const handleCompanySelect = (option: BaseOptions) => {
    setSelectedCompany(option);
    const { label } = option;
    const filteredLeadNumbersList =
      LEAD_NUMBERS.filter((item) => item.label === label) || [];
    filteredLeadNumbersList.length > 0 &&
      setSelectedLeadNumber(filteredLeadNumbersList[0]);
    setSelectedCompanyLeadNumberDropDown(filteredLeadNumbersList);
  };

  const handleCompanyLeadNumberSelect = (option: SelectLeadNumber) => {
    setSelectedLeadNumber(option);
  };

  const handleDateCalendarToggle = () => {
    setIsDateCalendarOpen(!isDateCalendarOpen);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setSqDate(selectedDate.toDateString());
    setIsDateCalendarOpen(false);
  };

  const handleToggleIsShippingAddressSame = () => {
    setIsShippingAddressSame(!isShippingAddressSame);
  };

  const handleAddTableRow = () => {
    const newRowData = {
      id: v4(),
      itemName: "",
      itemCode: 0,
      itemDescription: "",
      taxRate: 0,
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      total: 0,
    };
    const updatedItemTableDetails = [...itemTableDetails, newRowData];
    setItemTableDetails(updatedItemTableDetails);
  };

  return (
    <div className="flex flex-col flex-1 justify-between">
      <SalesQuotationHeaderSection
        selectedCompany={selectedCompany}
        sqNumber={sqNumber}
        isDateCalendarOpen={isDateCalendarOpen}
        selectedCompanyLeadNumberDropDown={selectedCompanyLeadNumberDropDown}
        selectedLeadNumber={selectedLeadNumber}
        sqDate={sqDate}
        handleDateChange={handleDateChange}
        handleDateCalendarToggle={handleDateCalendarToggle}
        handleCompanySelect={handleCompanySelect}
        handleCompanyLeadNumberSelect={handleCompanyLeadNumberSelect}
      />
      <SalesQuotationAddressSection
        address={address}
        isShippingAddressSame={isShippingAddressSame}
        handleToggleIsShippingAddressSame={handleToggleIsShippingAddressSame}
      />
      <SalesQuotationItemTableSection
        itemTableDetails={itemTableDetails}
        itemTableColumns={ITEM_TABLE_COLUMNS}
        handleAddTableRow={handleAddTableRow}
      />
      <SalesQuotationFooterSection />
    </div>
  );
};

export default function Todo() {
  return (
    <Layout>
      <SalesQuotation />
    </Layout>
  );
}
